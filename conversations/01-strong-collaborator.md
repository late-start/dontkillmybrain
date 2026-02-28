---
title: "Senior engineer debugging a race condition"
platform: "claude"
scenario: "A strong collaborator who steers, contributes domain knowledge, evaluates critically, and pushes back. Gold standard active engagement."
expected_signals:
  - turn: 0
    signal: "steering"
    rationale: "Opens with a clear problem statement and frames the debugging direction. Sets the agenda for the conversation."
  - turn: 1
    signal: "contribution"
    rationale: "Provides specific domain knowledge the AI cannot have — the actual deployment topology and traffic pattern that triggers the bug."
  - turn: 2
    signal: "friction"
    rationale: "Rejects the AI's suggestion outright based on direct experience. Provides a concrete reason why the suggestion won't work."
  - turn: 3
    signal: "evaluation"
    rationale: "Engages with the AI's second suggestion substantively — agrees with part of the reasoning but identifies a specific gap in the analysis."
  - turn: 4
    signal: "contribution"
    rationale: "Brings in context from another system (the metrics pipeline) that the AI has no way of knowing about. This reframes the problem."
  - turn: 5
    signal: "steering"
    rationale: "Redirects the investigation based on the new information. Decomposes the problem into a specific next step."
  - turn: 6
    signal: "evaluation"
    rationale: "Reads through the proposed code carefully and identifies a subtle bug — the lock scope is wrong. This is genuine evaluation, not rubber-stamping."
  - turn: 7
    signal: "friction"
    rationale: "Pushes back on the AI's assumption about atomicity. Raises the bar by pointing out a real-world constraint the AI missed."
  - turn: 8
    signal: "delegation"
    rationale: "Clearly scopes a task (write the final version with specific constraints) and hands off execution. This is strategic delegation, not capitulation — they've defined exactly what they want."
  - turn: 9
    signal: "evaluation"
    rationale: "Reviews the delegated output carefully, confirms it handles the edge case they care about, and approves with specific reasoning."
---

**Human:** I've got a race condition in our order processing service that only shows up under load. Orders are getting double-charged — we see duplicate entries in the payments table with timestamps within 2ms of each other. The service is written in Go. I think the issue is in the idempotency check but I want to walk through it with you.

**AI:** That's a classic symptom of a check-then-act race condition. In your idempotency check, the typical pattern would be:

1. Check if an order ID already exists in the payments table
2. If not, insert the payment record

Under concurrent requests, two goroutines can both pass the check before either inserts, leading to duplicates.

A few questions to help narrow this down:
- Are you using a database-level unique constraint on order ID, or is the idempotency check purely in application code?
- What's your database? (PostgreSQL's `INSERT ... ON CONFLICT` would be relevant)
- Are multiple instances of the service running behind a load balancer?

**Human:** Yeah so the thing is we do have a unique constraint on order_id in Postgres, but the payments table is actually partitioned by month — and I just realized the unique constraint is per-partition, not global. We run 8 replicas behind an ALB, and the duplicate charges happen almost exclusively during flash sales when we spike to ~4000 req/s. Normal load is maybe 200 req/s.

**AI:** That's a really important detail about the partitioned table. With monthly partitioning, your unique constraint on `order_id` only enforces uniqueness within a single partition. If an order spans a partition boundary (e.g., near month-end), you could get duplicates across partitions. But with 2ms apart, the duplicates are likely in the same partition.

Given 8 replicas at 4000 req/s, I think the more likely issue is that the application-level idempotency check is not atomic with the insert. Here's what I'd suggest:

1. **Add a global idempotency table** — a separate, unpartitioned table with just `order_id` and a unique constraint. Insert there first in a transaction.
2. **Use advisory locks** — `pg_advisory_xact_lock(hashtext(order_id))` before the check-and-insert.
3. **Switch to `INSERT ... ON CONFLICT`** — but you'd need to handle this at the unpartitioned level.

Which approach fits your architecture best?

**Human:** We already tried advisory locks about three months ago and it made things worse — the lock contention at 4000 req/s created a bottleneck that actually increased p99 latency by 800ms. Our SLA is 200ms p99 so that's a non-starter. The separate idempotency table is interesting but I'm worried about the extra write amplification on an already hot path.

**AI:** Fair point on both counts. Advisory locks at that throughput would definitely create contention issues.

Let me think about lower-contention approaches:

1. **Conditional insert with CTE**: You could use a single atomic statement:
   ```sql
   WITH existing AS (
     SELECT 1 FROM payments WHERE order_id = $1 LIMIT 1
   )
   INSERT INTO payments (order_id, amount, ...)
   SELECT $1, $2, ...
   WHERE NOT EXISTS (SELECT 1 FROM existing)
   RETURNING id;
   ```
   This is atomic at the statement level and doesn't require explicit locking.

2. **Application-level deduplication with Redis**: Before hitting Postgres at all, do an atomic `SET order_id NX EX 60` in Redis. Only proceed to the DB insert if the SET succeeds. This moves contention to Redis, which handles it much better at high throughput.

3. **Idempotency key in a separate unpartitioned table with `INSERT ... ON CONFLICT DO NOTHING`**: The write amplification concern is real, but this would be a very small row (just the key + timestamp). You could even use an in-memory table or have aggressive vacuuming.

The Redis approach (option 2) is probably your best bet for latency at that scale. What do you think?

**Human:** The CTE approach is clever but I'm not sure it solves the cross-partition problem — if two requests hit different partitions, the `NOT EXISTS` subquery would only check within the target partition, right? That's actually the root cause. The Redis approach — yeah, I think that's the right direction. But here's something you should know: we already have Redis in the hot path for session management, and I've been watching our Redis cluster metrics. We're seeing occasional cluster slot migrations under load that add 5-15ms of latency jitter.

**AI:** You're absolutely right about the CTE and partitions — the `NOT EXISTS` check would be partition-scoped by the query planner, so it wouldn't catch cross-partition duplicates. Good catch, that's the core issue.

On Redis: the slot migration latency is concerning but manageable. A few thoughts:

1. **Pin the idempotency keys to a specific slot range**: Use hash tags like `{idemp}:order_123` so all idempotency keys land on the same slot. This means slot migrations for other data won't affect your idempotency checks.

2. **Use a dedicated Redis instance**: Since this is a critical path, a single-node Redis (not clustered) with a replica for failover would eliminate slot migration entirely. At 4000 req/s for SET NX operations, a single Redis node handles that trivially.

3. **Fallback to DB**: If Redis is unavailable, fall back to the unpartitioned idempotency table approach. This gives you defense in depth.

The concern about write amplification on the DB fallback path is less relevant because it only activates during Redis failures, which should be rare.

**Human:** Ok I think the dedicated Redis instance is overkill for this. Let me think about what we actually need. The real problem is: we need a fast, globally unique check before the partitioned insert. We don't need persistence on the check — if Redis loses the key after 60 seconds, that's fine because the DB transaction will have completed by then. So let's go with the hash tag approach on our existing cluster. But I want to also add the unpartitioned table as a belt-and-suspenders fallback in the DB transaction itself.

**AI:** That's a solid architecture. So the flow would be:

```
1. Redis SET {idemp}:order_{id} NX EX 60
   ├── If key already exists → return idempotent response (cached result)
   └── If SET succeeded → proceed to step 2

2. BEGIN transaction
   a. INSERT INTO idempotency_keys (order_id) VALUES ($1)
      ON CONFLICT DO NOTHING
      RETURNING order_id
   b. If no row returned → ROLLBACK, return idempotent response
   c. If row returned → INSERT INTO payments (...) VALUES (...)
   d. COMMIT

3. Store result in Redis with same key for idempotent response caching
```

This gives you:
- **Redis layer**: Fast path, eliminates 99.9% of duplicate attempts before they hit the DB
- **DB layer**: Catches any duplicates that slip through (Redis failures, key expiry edge cases)
- **No advisory locks**: All contention is in Redis or handled by Postgres's own conflict resolution

Want me to write the Go implementation for this?

**Human:** Almost. But step 2a — that `INSERT ON CONFLICT DO NOTHING` followed by checking if a row was returned — I want to make sure the idempotency_keys insert and the payments insert are in the same transaction with the right isolation level. If we're at READ COMMITTED (Postgres default), couldn't two concurrent transactions both succeed on the idempotency_keys insert if they start before either commits? We need SERIALIZABLE or at least a row-level lock there.

**AI:** Great catch on the isolation level. You're right that at READ COMMITTED, there's a window where two concurrent transactions could both see no existing row in `idempotency_keys` and both proceed.

However, there's a subtlety: `INSERT ... ON CONFLICT DO NOTHING` is actually safe here even at READ COMMITTED. Here's why:

The `ON CONFLICT` check happens at the index level during the insert operation itself, not as a separate SELECT. When two transactions try to insert the same `order_id`:

1. Transaction A inserts, acquires a row lock on the new index entry
2. Transaction B tries to insert, sees the conflict at the index level, and blocks (waits for Transaction A)
3. Transaction A commits → Transaction B's insert sees the conflict and does nothing (returns 0 rows)

So `INSERT ... ON CONFLICT` is atomic at the index level, even under READ COMMITTED. You don't need SERIALIZABLE.

But — and this is important — you DO need to make sure the `idempotency_keys` table is **unpartitioned** with a proper unique index. If it were partitioned, you'd have the same problem you started with.

Want me to write the full implementation?

**Human:** Hmm wait. I think you're right about the INSERT ON CONFLICT being safe at the index level — but what about the gap between checking the RETURNING clause and doing the payments insert? If I check "did a row come back" in application code and then do the second insert, there's a round-trip to the DB between those steps. Is that actually a problem if they're in the same transaction? I think it's fine because the transaction holds the lock until commit, but I want to be sure.

**AI:** You're right, and let me be precise about why:

Within a single Postgres transaction:

1. `INSERT INTO idempotency_keys ... ON CONFLICT DO NOTHING RETURNING order_id` — this acquires a row-level lock if the insert succeeds
2. Your Go code checks the result — this is application-level logic, but the transaction is still open and holding the lock
3. `INSERT INTO payments ...` — still in the same transaction

The key insight: as long as both statements are in the **same transaction**, the lock from step 1 is held until `COMMIT` or `ROLLBACK`. Any competing transaction trying to insert the same `order_id` into `idempotency_keys` will **block at step 1** until your transaction completes.

So the round-trip to check the RETURNING result doesn't create a vulnerability. The lock is held by the transaction, not by the individual statement.

The only risk would be if your Go code accidentally starts a new transaction between the two inserts (e.g., if your ORM does implicit commits). You'd want to make sure you're using an explicit `tx.Exec()` pattern, not individual `db.Exec()` calls.

```go
tx, err := db.BeginTx(ctx, nil) // READ COMMITTED is fine
// step 1: insert idempotency key
// step 2: check result
// step 3: insert payment
tx.Commit()
```

**Human:** Ok that all makes sense. Let me give you the exact schema and you write the Go function. Here are the constraints: we're using pgx/v5 for Postgres, go-redis/v9 for Redis. The function should take a context, the order ID (uuid), amount (decimal as string to avoid float issues), and a customer ID. Return the payment ID on success, or the existing payment ID if it's a duplicate. Use our standard error wrapping pattern — `fmt.Errorf("processPayment: %w", err)`. The idempotency_keys table has columns (order_id UUID PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now()). The payments table has (id UUID DEFAULT gen_random_uuid(), order_id UUID, amount NUMERIC, customer_id UUID, created_at TIMESTAMPTZ DEFAULT now()).

**AI:** Here's the implementation:

```go
func (s *PaymentService) ProcessPayment(ctx context.Context, orderID uuid.UUID, amount string, customerID uuid.UUID) (uuid.UUID, error) {
    // Layer 1: Redis fast-path deduplication
    redisKey := fmt.Sprintf("{idemp}:order_%s", orderID)

    // Try to set the idempotency key in Redis
    set, err := s.redis.SetNX(ctx, redisKey, "", 60*time.Second).Result()
    if err != nil {
        // Redis failure — log and fall through to DB layer
        s.logger.Warn("redis idempotency check failed, falling back to DB",
            "order_id", orderID, "error", err)
    } else if !set {
        // Key already exists — this is a duplicate
        // Try to return the existing payment ID
        existingID, err := s.getExistingPaymentID(ctx, orderID)
        if err != nil {
            return uuid.Nil, fmt.Errorf("processPayment: %w", err)
        }
        return existingID, nil
    }

    // Layer 2: DB transaction with idempotency table
    tx, err := s.db.Begin(ctx)
    if err != nil {
        return uuid.Nil, fmt.Errorf("processPayment: %w", err)
    }
    defer tx.Rollback(ctx)

    // Insert into idempotency_keys — this is the authoritative duplicate check
    var idempReturned bool
    err = tx.QueryRow(ctx,
        `INSERT INTO idempotency_keys (order_id) VALUES ($1)
         ON CONFLICT DO NOTHING
         RETURNING TRUE`,
        orderID,
    ).Scan(&idempReturned)

    if err == pgx.ErrNoRows {
        // Conflict — duplicate order, another transaction already claimed it
        tx.Rollback(ctx)
        existingID, err := s.getExistingPaymentID(ctx, orderID)
        if err != nil {
            return uuid.Nil, fmt.Errorf("processPayment: %w", err)
        }
        return existingID, nil
    }
    if err != nil {
        return uuid.Nil, fmt.Errorf("processPayment: %w", err)
    }

    // Insert the payment
    var paymentID uuid.UUID
    err = tx.QueryRow(ctx,
        `INSERT INTO payments (order_id, amount, customer_id)
         VALUES ($1, $2, $3)
         RETURNING id`,
        orderID, amount, customerID,
    ).Scan(&paymentID)
    if err != nil {
        return uuid.Nil, fmt.Errorf("processPayment: %w", err)
    }

    if err := tx.Commit(ctx); err != nil {
        return uuid.Nil, fmt.Errorf("processPayment: %w", err)
    }

    // Cache the payment ID in Redis for fast duplicate responses
    s.redis.Set(ctx, redisKey, paymentID.String(), 60*time.Second)

    return paymentID, nil
}

func (s *PaymentService) getExistingPaymentID(ctx context.Context, orderID uuid.UUID) (uuid.UUID, error) {
    var paymentID uuid.UUID
    err := s.db.QueryRow(ctx,
        `SELECT id FROM payments WHERE order_id = $1 LIMIT 1`,
        orderID,
    ).Scan(&paymentID)
    if err != nil {
        return uuid.Nil, fmt.Errorf("getExistingPaymentID: %w", err)
    }
    return paymentID, nil
}
```

Key design decisions:
- Redis SET NX with hash tag `{idemp}` to pin to one slot
- Falls through to DB on Redis failure (no hard dependency)
- `INSERT ... ON CONFLICT DO NOTHING RETURNING TRUE` — the RETURNING clause gives us a clean way to detect the conflict case
- Explicit `tx.Begin`/`tx.Commit` pattern (no ORM implicit commits)
- Amount passed as string to avoid float precision issues with NUMERIC
- Error wrapping with your standard pattern

One thing to watch: the `getExistingPaymentID` query hits the partitioned payments table, so make sure you have an index on `order_id` across partitions (or in the default partition). Otherwise that lookup could be slow.

**Human:** Yeah good point on the index. This looks right. I traced through the concurrent case mentally: Transaction A gets past the idempotency insert, Transaction B blocks on the same insert, A commits, B sees the conflict and returns the cached payment ID. The Redis layer prevents most of that contention from ever hitting Postgres. One thing though — in the Redis failure fallback, you're logging a warning but should we also increment a metric? We use Prometheus and I'd want to alert if Redis failures spike.

**AI:** Absolutely, you'd want observability on that. Here's the updated Redis fallback block:

```go
if err != nil {
    s.logger.Warn("redis idempotency check failed, falling back to DB",
        "order_id", orderID, "error", err)
    s.metrics.RedisIdempotencyFailures.With(prometheus.Labels{
        "operation": "set_nx",
    }).Inc()
}
```

And you'd want a corresponding alert rule:

```yaml
- alert: RedisIdempotencyFailureRate
  expr: rate(payment_redis_idempotency_failures_total[5m]) > 0.01
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Redis idempotency check failure rate elevated"
```

You might also want metrics on:
- `payment_duplicate_detected_total` (with labels for `layer=redis` vs `layer=db`) — tells you how much work the Redis layer is saving
- `payment_processing_duration_seconds` histogram — to catch if the DB fallback path is degrading latency

Want me to add the full Prometheus metric definitions to the service struct?

**Human:** Good — but I'll handle the Prometheus setup myself, I have a specific pattern for how we register metrics in our service. The code you wrote for the ProcessPayment function looks solid. I verified the transaction flow handles the concurrent case correctly, and the fallback logic is right. Let's ship this.
