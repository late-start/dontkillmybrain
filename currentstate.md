# Classifier Evaluation State

## Baseline → V3 Prompt Changes

**Overall: 50.0% → 58.7% (+8.7pp)**

### Per-Signal Accuracy

| Signal | Baseline | V3 | Delta |
|---|---|---|---|
| steering | 53% (8/15) | 67% (10/15) | +14pp |
| friction | 50% (4/8) | 63% (5/8) | +13pp |
| contribution | 80% (8/10) | 80% (8/10) | same |
| evaluation | 50% (7/14) | 79% (11/14) | +29pp |
| passive_acceptance | 36% (8/22) | 50% (11/22) | +14pp |
| delegation | 57% (4/7) | 43% (3/7) | -14pp |
| capitulation | 44% (7/16) | 38% (6/16) | -6pp |

### What Worked

**The "domain knowledge rule"** — classifying based on what the turn DOES, not what information it contains — was the biggest single improvement. It fixed the evaluation→contribution confusion that plagued earlier attempts.

**Evaluation/friction scope distinction** — "evaluation targets the AI's specific output; friction targets the AI's approach/direction" — dramatically improved both signals.

**Complexity-proportional evaluation** — "yep looks right" IS evaluation for simple output, passive_acceptance for complex output — improved passive_acceptance detection.

### What Still Struggles

1. **passive_acceptance (50%)** — 5 cases misclassified as evaluation. The classifier sees any minor tweak or correction as active engagement, even when the change is cosmetic relative to the complexity of what was reviewed.

2. **capitulation (38%)** — 5 cases misclassified as passive_acceptance. The model sees someone not engaging and calls it passive, missing the decision-offloading signal ("What should I do?", "Can you just interpret these for me?").

3. **delegation (43%)** — 3 cases misclassified as contribution. When someone provides detailed specs AND delegates, the model sees information provision rather than task handoff.

### Whack-a-Mole Problem

Each prompt iteration improved some signals while breaking others:

| Signal | Baseline | V1 | V2 | V3 |
|---|---|---|---|---|
| steering | 53% | 40% | 33% | 67% |
| friction | 50% | 50% | 75% | 63% |
| evaluation | 50% | 36% | 21% | 79% |
| capitulation | 44% | 31% | 63% | 38% |

V2 achieved 63% capitulation and 75% friction but crashed evaluation to 21%.
V3 achieved 79% evaluation but lost capitulation gains.

### Ground Truth Quality

Of 38 remaining misclassifications:
- ~10 are clearly wrong (classifier genuinely misreads the turn)
- ~8 are genuinely debatable (both interpretations are reasonable)
- ~20 are persistent patterns where Haiku commits confidently (85-95%) to the wrong signal

Debatable ground truth examples:
- 01-Turn 4 (contribution→steering): The human IS making architectural decisions, not just providing info
- 01-Turn 7 (friction→delegation): The human IS providing a detailed task spec, not primarily pushing back
- 01-Turn 8 (delegation→evaluation): The human IS tracing through code and finding gaps
- 10-Turn 0 (steering→capitulation): "How should I think about this?" IS capitulation language

### Next Steps

1. **Switch to Sonnet for classification** — Haiku's high-confidence wrong answers (85-95%) suggest a capability ceiling on these nuanced distinctions
2. **Review ground truth labels** — ~8 debatable cases should be re-evaluated
3. **Consider conversation context** — Currently single-turn classification; trajectory-dependent signals (progressive capitulation) may need full-conversation context
