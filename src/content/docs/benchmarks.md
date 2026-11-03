---
title: "Benchmarks"
description: "What LocoFósil measures, and how."
---

The floor is not a single number. A card can be fast at short prompts, unusable at long context, cheap to buy, expensive to run, and still fail the task you care about. LocoFósil reports the dimensions separately.

## Metrics

| Metric | Unit | Why it matters |
|---|---|---|
| Generation speed | tokens/s | The number people feel |
| Prompt processing | tokens/s | The number that decides whether long prompts are usable |
| Time to first token | seconds | The number that decides whether a session feels responsive |
| Energy | tokens/J | The number that decides whether a low-power node is actually low power |
| Cost | $ per million tokens | The number that compares against cloud APIs |
| Task success | pass rate | The number that decides whether any of the above matters |
| Stability | failures per 100 runs | The number that decides whether you can leave it running |

## Method

1. Fix the model, quantisation, runtime, and flags.
2. Run the same prompt set at 512, 2,000, 8,000, and 32,000 tokens where the card allows it.
3. Repeat each measurement three times and report the median.
4. Measure wall power at idle and under sustained load.
5. Record every failure, not just the successful runs.
6. Publish the raw trace and the command line.

## Experiments

The shelf has 11 card models. Not every model gets an experiment at once; the matrix records the queue.

| ID | Question | Hardware | Runtime | Model | Status |
|---|---|---|---|---|---|
| F1 | How far apart are Kindi and llama.cpp on the smallest Maxwell card? | K620 2 GB | Kindi, llama.cpp | Ternary-Bonsai 2B | Planned |
| F2 | Can two K1200 cards serve a 27B model usefully? | 2 x K1200 | Kindi | Ternary-Bonsai 27B | Planned |
| F3 | Does architecture matter at the same 8 GB tier? | K5200, P4000 | Kindi, llama.cpp | TBD | Planned |
| F4 | Does a K80 or K10 behave as one card or two? | K80, K10 | TBD | TBD | Planned |
| F5 | What does the Optiplex plus K1200 node draw at the wall? | Optiplex, K1200 | Kindi | Ternary-Bonsai 2B and 9B | Planned |
| F6 | Is a 2B model useful as a thinking partner when the harness carries the structure? | Optiplex, K1200 | Kindi plus harness | Ternary-Bonsai 2B | Planned |
| F7 | How do the Pascal cards compare at 2, 4, 5, and 8 GB? | P600, P1000, P2000, P4000 | Kindi, llama.cpp | Ternary-Bonsai 2B and 9B | Planned |

## Results

No results published yet. The first results will appear here with the raw traces and the exact command line.

Until then, the dated work log is at [LocoNotas](https://loconotas.org).
