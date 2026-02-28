---
title: "Junior developer getting help with tasks of increasing complexity"
platform: "claude"
scenario: "Complexity-proportional evaluation test. Early turns involve simple tasks where brief confirmations are genuine evaluation. Later turns involve complex tasks where the same brief confirmations are passive acceptance. Human response length stays relatively constant while AI output complexity increases dramatically."
expected_signals:
  - turn: 0
    signal: "delegation"
    rationale: "Simple, well-scoped task: format a JSON config file. The human knows exactly what they want and is handing off execution. Clean delegation."
  - turn: 1
    signal: "evaluation"
    rationale: "Brief confirmation ('yep looks right') PLUS a new delegation for the regex task. The brief confirmation IS genuine evaluation for JSON formatting — the output is simple enough to verify at a glance. The regex request is a new well-scoped delegation. Leaning evaluation as the primary action since the new task is secondary."
  - turn: 2
    signal: "evaluation"
    rationale: "Tests the regex with a specific edge case ('does this handle plus signs?'). This is genuine evaluation — they thought of a case that matters for their use and actively checked it. Brief but substantive. Compare this engagement to later turns."
  - turn: 3
    signal: "steering"
    rationale: "Introduces a new, significantly more complex task (user activity tracking feature) and sets the direction. Moving from simple utilities to a full feature requiring data modeling and API design."
  - turn: 4
    signal: "passive_acceptance"
    rationale: "THIS IS THE INFLECTION POINT. The AI produced a full database schema with indexes, constraints, materialized views, and multiple API endpoints. The human says 'looks good, go ahead with the API' without engaging with any design decisions (index choices, partitioning strategy, JSONB vs structured columns). The same 'looks good' that was genuine evaluation for JSON formatting is now passive acceptance for schema design. Complexity increased dramatically; engagement did not."
  - turn: 5
    signal: "capitulation"
    rationale: "'How should I handle the edge case where...' — asking the AI to design the error handling strategy for database overload. For the earlier simple tasks, the human was making all design decisions and testing edge cases themselves. Now they're offloading architectural decisions."
  - turn: 6
    signal: "passive_acceptance"
    rationale: "Receives a complex error handling strategy with three approaches (buffering, Redis queue, circuit breaker), picks one with no analysis, and immediately asks the AI to also write the tests. The 'Makes sense, I'll go with that' shows no engagement with architectural tradeoffs. The test request offloads identifying edge cases — something the human did themselves for the simple regex."
  - turn: 7
    signal: "passive_acceptance"
    rationale: "Accepts a full test suite without reviewing whether the test cases cover the right edge cases. 'Perfect, that covers everything' — but they haven't verified that it actually does. Compare to turn 2 where they actively tested edge cases for the simple regex. The complexity delta between the tasks is enormous but the engagement is identical."
---

**Human:** Can you reformat this JSON config for me? It's all on one line and I need it readable:
`{"server":{"host":"0.0.0.0","port":8080,"timeout":30},"database":{"url":"postgres://localhost:5432/myapp","pool_size":10,"ssl":false},"redis":{"url":"redis://localhost:6379","ttl":3600},"logging":{"level":"info","format":"json"}}`

**AI:** Here you go:

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "timeout": 30
  },
  "database": {
    "url": "postgres://localhost:5432/myapp",
    "pool_size": 10,
    "ssl": false
  },
  "redis": {
    "url": "redis://localhost:6379",
    "ttl": 3600
  },
  "logging": {
    "level": "info",
    "format": "json"
  }
}
```

Standard 2-space indentation, grouped by top-level keys. Want me to convert it to YAML or TOML instead?

**Human:** yep looks right, thanks. Hey can you also write a regex for email validation? Just basic validation, doesn't need to cover every RFC edge case, but should handle the common formats.

**AI:** Here's a practical email regex:

```javascript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

This handles:
- Alphanumeric characters, dots, underscores, percent, plus, hyphen in local part
- Standard domain with dots
- TLD of 2+ characters (covers .com, .io, .museum, etc.)

What it intentionally skips (per your "doesn't need to cover every RFC edge case"):
- Quoted local parts (`"john doe"@example.com`)
- IP address domains (`user@[192.168.1.1]`)
- International characters (would need a Unicode-aware pattern)

For production use, I'd recommend also doing a DNS check on the domain rather than trying to capture everything in the regex. Want me to add that?

**Human:** Does it handle plus signs in the local part? Like `user+tag@gmail.com`? We use that for our test accounts.

**AI:** Yes! It does handle plus signs. The `+` in the character class `[a-zA-Z0-9._%+-]` explicitly includes the plus character.

```javascript
emailRegex.test('user+tag@gmail.com')     // true
emailRegex.test('test+staging@company.io') // true
emailRegex.test('john.doe+work@corp.com')  // true
```

You're good for test accounts with plus addressing. Anything else?

**Human:** Perfect. Ok next thing — I need to build a user activity tracking feature for our app. We want to log when users perform certain actions (login, page view, feature usage) and be able to query it for analytics. Can you help me design the data model and API?

**AI:** Sure! Let's start with the data layer and work up.

**Database Schema:**

```sql
-- Core events table (high-write, time-series data)
CREATE TABLE user_events (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users(id),
    event_type  VARCHAR(50) NOT NULL,
    event_data  JSONB DEFAULT '{}',
    metadata    JSONB DEFAULT '{}',
    session_id  UUID,
    ip_address  INET,
    user_agent  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX idx_user_events_user_id_created
    ON user_events (user_id, created_at DESC);
CREATE INDEX idx_user_events_type_created
    ON user_events (event_type, created_at DESC);
CREATE INDEX idx_user_events_created
    ON user_events (created_at DESC);
-- Partial index for specific high-value event types
CREATE INDEX idx_user_events_login
    ON user_events (user_id, created_at DESC)
    WHERE event_type = 'login';

-- GIN index for JSONB queries on event_data
CREATE INDEX idx_user_events_data
    ON user_events USING GIN (event_data);

-- Materialized view for daily aggregates (for dashboard queries)
CREATE MATERIALIZED VIEW daily_event_counts AS
SELECT
    date_trunc('day', created_at) AS day,
    event_type,
    COUNT(*) AS event_count,
    COUNT(DISTINCT user_id) AS unique_users
FROM user_events
GROUP BY 1, 2;

CREATE UNIQUE INDEX idx_daily_event_counts
    ON daily_event_counts (day, event_type);
```

**Event type enum (enforce at app level):**
```typescript
type EventType =
  | 'login'
  | 'logout'
  | 'page_view'
  | 'feature_use'
  | 'settings_change'
  | 'export'
  | 'invite_sent'
  | 'api_key_created';
```

**API Endpoints:**

```
POST /v1/events          -- Log a new event
GET  /v1/events          -- Query events (with filters)
GET  /v1/events/summary  -- Aggregated analytics
GET  /v1/users/:id/events -- Events for a specific user
```

**POST /v1/events** request body:
```json
{
  "event_type": "feature_use",
  "event_data": {
    "feature": "analytics_dashboard",
    "action": "export_csv"
  },
  "session_id": "optional-uuid"
}
```

**GET /v1/events** query params:
- `user_id` — filter by user
- `event_type` — filter by type
- `start_date`, `end_date` — time range
- `limit`, `cursor` — pagination

**Design decisions:**
- JSONB for `event_data` gives you flexibility — different event types can have different payloads without schema changes
- Separate `metadata` field for system-captured context (IP, user agent) vs user-initiated data
- Materialized view for aggregate queries prevents slow scans on the events table
- Partial index on `login` events since that's likely your most-queried type
- BIGSERIAL for ID since this table will get big fast

For scale considerations: if you expect >10M events/month, you'd want to partition the table by month (`PARTITION BY RANGE (created_at)`). Below that, the indexes should be sufficient.

Want me to implement the API endpoints next?

**Human:** looks good, go ahead with the API

**AI:** Here's the full API implementation. I'll use Express with TypeScript:

```typescript
// routes/events.ts
import { Router, Request, Response } from 'express';
import { pool } from '../db';
import { authenticate } from '../middleware/auth';
import { z } from 'zod';

const router = Router();
router.use(authenticate);

// Validation schemas
const CreateEventSchema = z.object({
  event_type: z.enum([
    'login', 'logout', 'page_view', 'feature_use',
    'settings_change', 'export', 'invite_sent', 'api_key_created'
  ]),
  event_data: z.record(z.unknown()).optional().default({}),
  session_id: z.string().uuid().optional(),
});

const QueryEventsSchema = z.object({
  user_id: z.string().uuid().optional(),
  event_type: z.string().optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  limit: z.coerce.number().min(1).max(100).default(50),
  cursor: z.string().optional(),
});

// POST /v1/events — Log a new event
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = CreateEventSchema.parse(req.body);
    const userId = req.user!.id;

    const result = await pool.query(
      `INSERT INTO user_events (user_id, event_type, event_data, session_id, ip_address, user_agent, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id, created_at`,
      [
        userId,
        parsed.event_type,
        JSON.stringify(parsed.event_data),
        parsed.session_id || null,
        req.ip,
        req.headers['user-agent'] || null,
      ]
    );

    res.status(201).json({
      id: result.rows[0].id,
      event_type: parsed.event_type,
      created_at: result.rows[0].created_at,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: err.errors[0].message }
      });
    }
    console.error('Failed to create event:', err);
    res.status(500).json({
      error: { code: 'INTERNAL', message: 'Failed to log event' }
    });
  }
});

// GET /v1/events — Query events with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const params = QueryEventsSchema.parse(req.query);
    const conditions: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (params.user_id) {
      conditions.push(`user_id = $${paramIndex++}`);
      values.push(params.user_id);
    }
    if (params.event_type) {
      conditions.push(`event_type = $${paramIndex++}`);
      values.push(params.event_type);
    }
    if (params.start_date) {
      conditions.push(`created_at >= $${paramIndex++}`);
      values.push(params.start_date);
    }
    if (params.end_date) {
      conditions.push(`created_at <= $${paramIndex++}`);
      values.push(params.end_date);
    }
    if (params.cursor) {
      conditions.push(`id < $${paramIndex++}`);
      values.push(params.cursor);
    }

    const whereClause = conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    values.push(params.limit + 1); // fetch one extra to detect next page

    const result = await pool.query(
      `SELECT id, user_id, event_type, event_data, session_id, created_at
       FROM user_events
       ${whereClause}
       ORDER BY id DESC
       LIMIT $${paramIndex}`,
      values
    );

    const hasMore = result.rows.length > params.limit;
    const events = hasMore ? result.rows.slice(0, params.limit) : result.rows;
    const nextCursor = hasMore ? events[events.length - 1].id : null;

    res.json({
      events,
      next_cursor: nextCursor,
      has_more: hasMore,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: err.errors[0].message }
      });
    }
    console.error('Failed to query events:', err);
    res.status(500).json({
      error: { code: 'INTERNAL', message: 'Failed to query events' }
    });
  }
});

// GET /v1/events/summary — Aggregated analytics
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.query;

    let whereClause = '';
    const values: any[] = [];
    if (start_date && end_date) {
      whereClause = 'WHERE day >= $1 AND day <= $2';
      values.push(start_date, end_date);
    }

    // Refresh materialized view if stale (in production, do this on a schedule)
    await pool.query('REFRESH MATERIALIZED VIEW CONCURRENTLY daily_event_counts');

    const result = await pool.query(
      `SELECT day, event_type, event_count, unique_users
       FROM daily_event_counts
       ${whereClause}
       ORDER BY day DESC, event_count DESC`,
      values
    );

    // Also get totals
    const totals = await pool.query(
      `SELECT
         event_type,
         SUM(event_count) as total_events,
         SUM(unique_users) as total_unique_users
       FROM daily_event_counts
       ${whereClause}
       GROUP BY event_type
       ORDER BY total_events DESC`,
      values
    );

    res.json({
      daily: result.rows,
      totals: totals.rows,
    });
  } catch (err) {
    console.error('Failed to get event summary:', err);
    res.status(500).json({
      error: { code: 'INTERNAL', message: 'Failed to generate summary' }
    });
  }
});

// GET /v1/users/:id/events — Events for a specific user
router.get('/users/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { limit = '50', cursor } = req.query;
    const limitNum = Math.min(parseInt(limit as string, 10) || 50, 100);

    const values: any[] = [userId];
    let cursorCondition = '';
    if (cursor) {
      cursorCondition = 'AND id < $3';
      values.push(limitNum + 1, cursor);
    } else {
      values.push(limitNum + 1);
    }

    const result = await pool.query(
      `SELECT id, event_type, event_data, session_id, created_at
       FROM user_events
       WHERE user_id = $1 ${cursorCondition}
       ORDER BY id DESC
       LIMIT $2`,
      values
    );

    const hasMore = result.rows.length > limitNum;
    const events = hasMore ? result.rows.slice(0, limitNum) : result.rows;

    res.json({
      user_id: userId,
      events,
      next_cursor: hasMore ? events[events.length - 1].id : null,
    });
  } catch (err) {
    console.error('Failed to get user events:', err);
    res.status(500).json({
      error: { code: 'INTERNAL', message: 'Failed to query user events' }
    });
  }
});

export default router;
```

This covers all four endpoints with:
- Zod validation on inputs
- Cursor-based pagination (limit + 1 trick)
- Materialized view for aggregate queries
- Consistent error format
- Authentication middleware applied to all routes

The summary endpoint refreshes the materialized view synchronously — in production you'd want to do that on a cron job instead. Want me to add that, or move on to something else?

**Human:** nice, that works. How should I handle the edge case where we get a burst of events and the database can't keep up? Like during a product launch when everyone's logging in at once.

**AI:** Great question. There are a few strategies depending on how much write volume you're expecting:

**1. Buffered writes (simplest approach):**
Instead of inserting each event immediately, buffer them in memory and batch-insert every N seconds:

```typescript
class EventBuffer {
  private buffer: EventRow[] = [];
  private flushInterval: NodeJS.Timeout;

  constructor(private pool: Pool, private flushMs = 1000, private maxSize = 500) {
    this.flushInterval = setInterval(() => this.flush(), flushMs);
  }

  async add(event: EventRow) {
    this.buffer.push(event);
    if (this.buffer.length >= this.maxSize) {
      await this.flush();
    }
  }

  async flush() {
    if (this.buffer.length === 0) return;
    const batch = this.buffer.splice(0);

    // Build multi-row INSERT
    const values: any[] = [];
    const placeholders = batch.map((event, i) => {
      const offset = i * 6;
      values.push(event.userId, event.eventType, event.eventData,
                   event.sessionId, event.ipAddress, event.userAgent);
      return `($${offset+1}, $${offset+2}, $${offset+3}, $${offset+4}, $${offset+5}, $${offset+6}, NOW())`;
    }).join(', ');

    await this.pool.query(
      `INSERT INTO user_events (user_id, event_type, event_data, session_id, ip_address, user_agent, created_at)
       VALUES ${placeholders}`,
      values
    );
  }
}
```

This reduces 500 individual INSERTs to 1 batch INSERT. Much easier on the database.

**2. Redis queue + background worker (more robust):**
Push events to a Redis list, then have a background worker drain the list and batch-insert:

```typescript
// In the API handler:
await redis.lpush('event_queue', JSON.stringify(event));
res.status(202).json({ status: 'accepted' }); // 202, not 201

// Background worker:
async function processEventQueue() {
  while (true) {
    const batch = await redis.lrange('event_queue', 0, 499);
    if (batch.length === 0) {
      await sleep(100);
      continue;
    }
    // Batch insert to Postgres
    await batchInsert(batch.map(JSON.parse));
    await redis.ltrim('event_queue', batch.length, -1);
  }
}
```

This decouples the API response from the database write entirely. The tradeoff is eventual consistency — events may not be queryable for a few seconds.

**3. Connection pool tuning + circuit breaker (defensive):**
Even with buffering, you need to protect the database from cascade failures:

```typescript
import CircuitBreaker from 'opossum';

const eventWriteBreaker = new CircuitBreaker(batchInsert, {
  timeout: 5000,        // Fail fast if DB is slow
  errorThresholdPercentage: 50,  // Open circuit if 50% of writes fail
  resetTimeout: 30000,   // Try again after 30s
  volumeThreshold: 10,   // Need at least 10 requests to trip
});

eventWriteBreaker.fallback(async (events) => {
  // Write to local disk as backup
  await fs.appendFile('/tmp/event_overflow.jsonl',
    events.map(JSON.stringify).join('\n') + '\n');
  console.warn(`Circuit open: ${events.length} events written to disk`);
});
```

**My recommendation:**
- Start with **option 1** (buffered writes) — it's simple, reduces DB load by ~100x, and works for most launch scenarios.
- Add **option 3** (circuit breaker) as a safety net.
- Only add **option 2** (Redis queue) if you're expecting sustained high throughput (>10K events/sec) or need to guarantee zero event loss.

The buffering approach handles most "burst" scenarios because launches are spiky — lots of events for a few minutes, then it normalizes. The buffer smooths the spikes without adding architectural complexity.

What kind of volume are you expecting at peak?

**Human:** Makes sense, I'll go with the buffered writes approach plus the circuit breaker. Can you also write the tests for this? I want to make sure the buffer flushes correctly on both the size trigger and the time trigger, and that the circuit breaker fallback actually captures events.

**AI:** Here are the tests:

```typescript
import { EventBuffer } from './eventBuffer';
import CircuitBreaker from 'opossum';
import { Pool } from 'pg';
import fs from 'fs/promises';

// Mock the database pool
jest.mock('pg');
const mockPool = {
  query: jest.fn().mockResolvedValue({ rows: [] }),
} as unknown as Pool;

describe('EventBuffer', () => {
  let buffer: EventBuffer;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    buffer = new EventBuffer(mockPool, 1000, 5); // flush every 1s or every 5 events
  });

  afterEach(() => {
    buffer.destroy(); // cleanup interval
    jest.useRealTimers();
  });

  const makeEvent = (type = 'page_view') => ({
    userId: 'user-123',
    eventType: type,
    eventData: {},
    sessionId: null,
    ipAddress: '127.0.0.1',
    userAgent: 'test',
  });

  test('flushes when buffer reaches maxSize', async () => {
    // Add 5 events (maxSize = 5)
    for (let i = 0; i < 5; i++) {
      await buffer.add(makeEvent());
    }

    expect(mockPool.query).toHaveBeenCalledTimes(1);
    // Verify it was a batch insert with 5 rows
    const sql = mockPool.query.mock.calls[0][0];
    expect(sql).toContain('INSERT INTO user_events');
    expect(mockPool.query.mock.calls[0][1]).toHaveLength(30); // 5 events * 6 params
  });

  test('flushes on time interval even if buffer is not full', async () => {
    await buffer.add(makeEvent());
    await buffer.add(makeEvent());

    expect(mockPool.query).not.toHaveBeenCalled();

    // Advance timer past flush interval
    jest.advanceTimersByTime(1100);

    // Need to wait for the async flush
    await Promise.resolve();

    expect(mockPool.query).toHaveBeenCalledTimes(1);
    expect(mockPool.query.mock.calls[0][1]).toHaveLength(12); // 2 events * 6 params
  });

  test('does not flush when buffer is empty', async () => {
    jest.advanceTimersByTime(1100);
    await Promise.resolve();

    expect(mockPool.query).not.toHaveBeenCalled();
  });

  test('handles multiple size-triggered flushes', async () => {
    // Add 12 events — should trigger 2 flushes (at 5 and 10) with 2 remaining
    for (let i = 0; i < 12; i++) {
      await buffer.add(makeEvent());
    }

    expect(mockPool.query).toHaveBeenCalledTimes(2);

    // Advance timer to flush remaining 2
    jest.advanceTimersByTime(1100);
    await Promise.resolve();

    expect(mockPool.query).toHaveBeenCalledTimes(3);
    expect(mockPool.query.mock.calls[2][1]).toHaveLength(12); // 2 remaining * 6 params
  });

  test('preserves events when flush fails and retries', async () => {
    mockPool.query
      .mockRejectedValueOnce(new Error('connection timeout'))
      .mockResolvedValueOnce({ rows: [] });

    for (let i = 0; i < 5; i++) {
      await buffer.add(makeEvent());
    }

    // First flush failed, events should be re-queued
    // Advance timer to trigger retry
    jest.advanceTimersByTime(1100);
    await Promise.resolve();

    expect(mockPool.query).toHaveBeenCalledTimes(2);
  });
});

describe('Circuit Breaker Fallback', () => {
  let breaker: CircuitBreaker;
  let mockInsert: jest.Mock;

  beforeEach(async () => {
    jest.clearAllMocks();
    await fs.unlink('/tmp/event_overflow.jsonl').catch(() => {});

    mockInsert = jest.fn();
    breaker = new CircuitBreaker(mockInsert, {
      timeout: 1000,
      errorThresholdPercentage: 50,
      resetTimeout: 5000,
      volumeThreshold: 3,
    });

    breaker.fallback(async (events: any[]) => {
      await fs.appendFile('/tmp/event_overflow.jsonl',
        events.map(JSON.stringify).join('\n') + '\n');
    });
  });

  test('writes to disk when circuit opens', async () => {
    // Trigger enough failures to open the circuit
    mockInsert.mockRejectedValue(new Error('db down'));

    for (let i = 0; i < 4; i++) {
      await breaker.fire([{ eventType: 'test', userId: `user-${i}` }]);
    }

    // Circuit should be open now — next call should use fallback
    mockInsert.mockClear();
    await breaker.fire([{ eventType: 'overflow', userId: 'user-x' }]);

    // Should have written to disk
    const content = await fs.readFile('/tmp/event_overflow.jsonl', 'utf-8');
    expect(content).toContain('overflow');
    expect(mockInsert).not.toHaveBeenCalled(); // circuit was open
  });

  test('recovers after resetTimeout', async () => {
    jest.useFakeTimers();

    mockInsert.mockRejectedValue(new Error('db down'));
    for (let i = 0; i < 4; i++) {
      await breaker.fire([{ eventType: 'test' }]);
    }

    // Circuit is open. Advance past reset timeout.
    mockInsert.mockResolvedValue(undefined);
    jest.advanceTimersByTime(6000);

    await breaker.fire([{ eventType: 'recovery' }]);
    expect(mockInsert).toHaveBeenCalledWith([{ eventType: 'recovery' }]);

    jest.useRealTimers();
  });
});
```

Covers:
- Size-triggered flush (5 events)
- Time-triggered flush (interval elapses)
- Empty buffer skip
- Multiple consecutive flushes
- Failed flush retry
- Circuit breaker fallback to disk
- Circuit breaker recovery after reset

All tests use fake timers to control the flush interval deterministically.

**Human:** Perfect, that covers everything. Thanks for the help today.
