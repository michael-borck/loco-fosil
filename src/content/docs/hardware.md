---
title: "Hardware"
description: "The cards, the compute capabilities, and the runtime cliffs."
---

LocoFósil starts with the cards already on the bench. The table records what is known and what still needs testing. Treat every status as provisional until a result page links to it.

## Inventory

| Card | Memory | Architecture | Compute capability | Driver branch | Status |
|---|---|---|---|---|---|
| Quadro K420 | 1 GB | Kepler | 3.0 | 470 | Available |
| Quadro K1200 | 4 GB | Maxwell | 5.0 | Current | 2 cards available |
| Tesla K40 | 12 GB | Kepler | 3.5 | 470 | Available |
| Tesla K80 | 2 x 12 GB | Kepler | 3.7 | 470 | Available |
| Tesla M10 | 8 GB | Maxwell | 5.2 | Current | Available |
| Quadro K5200 | 8 GB | Kepler | 3.0 | 470 | Incoming |
| Optiplex host | n/a | n/a | n/a | n/a | Model to confirm |

The K80 is a dual-GPU card. Treat each GPU as its own device. The two K1200 cards can run one model in tensor parallel or two models as separate servers.

## Runtime cliffs

The modern AI stack assumes newer compute capabilities. The useful work is finding the exact point where each runtime stops.

| Tier | Cards | CUDA | What usually works | What usually does not |
|---|---|---|---|---|
| Kepler | K420, K40, K5200 | 10.2, driver 470 | Kindi, some legacy llama.cpp builds | Modern PyTorch, bitsandbytes, Unsloth |
| Maxwell | K1200, M10 | 11.x or 12.x | llama.cpp, Ollama, Kindi | Some quantisation kernels |
| Pascal and later | not yet in the rack | 12.x | Modern llama.cpp, Ollama | Older drivers |

These are starting hypotheses, not results. The compatibility matrix will replace them.

## Compatibility matrix

| Runtime | K420 | K1200 | K40 | K80 | M10 | K5200 |
|---|---|---|---|---|---|---|
| Kindi | Planned | Planned | Unknown | Unknown | Unknown | Unknown |
| llama.cpp legacy | Planned | Planned | Unknown | Unknown | Unknown | Unknown |
| llama.cpp current | Unknown | Planned | Unknown | Unknown | Unknown | Unknown |
| Ollama | Unknown | Unknown | Unknown | Unknown | Unknown | Unknown |
| Msty client | n/a | Planned | n/a | n/a | n/a | n/a |

`Unknown` means no attempt yet. `Planned` means the card is on the bench and the test is queued. A result only counts when it links to a measured page.

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
