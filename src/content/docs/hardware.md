---
title: "Hardware"
description: "The cards, the compute capabilities, and the runtime cliffs."
---

LocoFósil starts with the cards on the shelf. The inventory covers Kepler, Maxwell, and Pascal, from 2 GB entry cards to 12 GB server parts. Treat every status as provisional until a result page links to it.

## Inventory

| Card | Memory | Architecture | Compute capability | Driver branch | Cards |
|---|---|---|---|---|---|
| GeForce GTX 770 | 2 or 4 GB | Kepler | 3.0 | 470 | 1 |
| Tesla K10 | 2 x 4 GB | Kepler | 3.0 | 470 | 2 |
| Quadro K5200 | 8 GB | Kepler | 3.0 | 470 | 1 |
| Quadro K6000 | 12 GB | Kepler | 3.0 | 470 | 1 |
| Tesla K80 | 2 x 12 GB | Kepler | 3.7 | 470 | 1 |
| Quadro K620 | 2 GB | Maxwell | 5.0 | Current | 1 |
| Quadro K1200 | 4 GB | Maxwell | 5.0 | Current | 2 |
| Quadro P600 | 2 GB | Pascal | 6.1 | Current | 1 |
| Quadro P1000 | 4 GB | Pascal | 6.1 | Current | 1 |
| Quadro P2000 | 5 GB | Pascal | 6.1 | Current | 1 |
| Quadro P4000 | 8 GB | Pascal | 6.1 | Current | 1 |

The GTX 770 shipped in 2 GB and 4 GB versions. Confirm the card before recording results.

The Tesla K10 and K80 are dual-GPU cards. Treat each GPU as its own device. Two K1200 cards can run one model in tensor parallel or two models as separate servers.

## Runtime cliffs

The modern AI stack assumes newer compute capabilities. The useful work is finding the exact point where each runtime stops.

| Tier | Cards | CUDA | What usually works | What usually does not |
|---|---|---|---|---|
| Kepler | K10, K80, GTX 770, K5200, K6000 | 10.2, driver 470 | Kindi, some legacy llama.cpp builds | Modern PyTorch, bitsandbytes, Unsloth |
| Maxwell | K620, K1200 | 11.x or 12.x | llama.cpp, Ollama, Kindi | Some quantisation kernels |
| Pascal | P600, P1000, P2000, P4000 | 12.x | Modern llama.cpp, Ollama, Kindi | Older drivers and legacy builds |

These are starting hypotheses, not results. The compatibility matrix replaces them with measured statuses.

## Compatibility matrix

| Runtime | Kepler (K10, K80, GTX 770, K5200, K6000) | Maxwell (K620, K1200) | Pascal (P600, P1000, P2000, P4000) |
|---|---|---|---|
| Kindi | Planned | Planned | Planned |
| llama.cpp legacy | Planned | Planned | Planned |
| llama.cpp current | Expected fail | Planned | Planned |
| Ollama | Unknown | Planned | Planned |

`Planned` means the card is on the shelf and the test is queued. `Expected fail` is a hypothesis from the runtime's documented compute-capability floor, not a measurement. `Unknown` means no attempt yet. A result only counts when it links to a measured page.

## What to record

Every card gets the same record:

- `nvidia-smi` output
- driver version and CUDA version
- runtime and build flags
- model name, parameter count, quantisation
- context length and batch size
- generation speed and prompt processing speed
- wall power at idle and under load
- failures, warnings, and thermal notes

## Contributing a card

Open an issue with the record above. Community results are welcome for AMD and Intel too, but the first matrix is Nvidia only so the method stays comparable.

Raw notes and failures live at [LocoNotas](https://loconotas.org).
