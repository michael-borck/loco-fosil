---
title: "Hardware"
description: "The cards, the compute capabilities, and the runtime cliffs."
---

LocoFósil starts with the cards on the shelf. The inventory covers Kepler, Maxwell, and Pascal, from 2 GB entry cards to 12 GB server parts. Every card here is CUDA-capable. The limit is the newest toolkit and driver that still target the architecture.

## Inventory

| Card | Memory | Architecture | Compute capability | Max CUDA | Last driver | Cards | GPU devices |
|---|---|---|---|---|---|---|---|
| GeForce GTX 770 | 2 or 4 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| Tesla K10 | 2 x 4 GB | Kepler | 3.0 | 10.2 | 470 | 2 | 4 |
| Quadro K5200 | 8 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| Quadro K6000 | 12 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| Tesla K80 | 2 x 12 GB | Kepler | 3.7 | 11.4 practical | 470 | 1 | 2 |
| Quadro K620 | 2 GB | Maxwell | 5.0 | 12.9 | 580 | 1 | 1 |
| Quadro K1200 | 4 GB | Maxwell | 5.0 | 12.9 | 580 | 2 | 2 |
| Quadro P600 | 2 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |
| Quadro P1000 | 4 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |
| Quadro P2000 | 5 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |
| Quadro P4000 | 8 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |

The GTX 770 shipped in 2 GB and 4 GB versions. Confirm the card before recording results.

The Tesla K10 and K80 are dual-GPU cards: one physical card, two CUDA devices, each with its own memory. A K80 is two 12 GB GPUs, not a single 24 GB pool. A K10 is two 4 GB GPUs. The memory figures above are per GPU. A model must fit on one device unless the runtime splits it across both. `nvidia-smi` lists each GPU separately.

The K1200 is a single-GPU card. Two K1200 cards mean two devices, and they can run one model in tensor parallel or two models as separate servers.

That is 13 cards and 16 GPU devices.

## What the compute level means

Compute capability is the architecture level the CUDA toolkit compiles for. A card is not too old for CUDA. It is limited to the last toolkit and driver that still target its level.

| Architecture | Compute capability | Newest toolkit | Last driver | Notes |
|---|---|---|---|---|
| Kepler | 3.0 | CUDA 10.2 | 470 | K10, GTX 770, K5200, K6000 |
| Kepler | 3.7 | CUDA 11.4 practical | 470 | K80. CUDA 11.8 can target 3.5 and 3.7, but the 470 driver tops out at 11.4. |
| Maxwell | 5.0 | CUDA 12.9 | 580 | K620, K1200. CUDA 13.0 dropped Maxwell. |
| Pascal | 6.1 | CUDA 12.9 | 580 | P600, P1000, P2000, P4000. CUDA 13.0 dropped Pascal. |

CUDA 13.0 removed offline compilation for everything below compute capability 7.5: Maxwell, Pascal, and Volta. The 580 driver branch is the last one for those architectures and is supported through mid-2028. Applications built with CUDA 12.x continue to run.

Kepler went earlier. CUDA 11.0 dropped compute capability 3.0 and 3.2. CUDA 12.0 dropped 3.5 and 3.7. Driver 470 is the last Kepler branch, and its support period has ended. That is why Kindi ships a CUDA 10.2 image: it keeps Kepler cards usable after the modern stack moved on.

## VRAM speed and bandwidth

Decode speed tracks memory bandwidth more closely than architecture generation. The K6000 and K80 have more bandwidth than the P1000 and P2000. The P4000 is the fastest Pascal card on the shelf. The K620 and P600 are the slowest.

These are approximate vendor figures. Memory clock is the base clock, not the effective data rate. DDR3 transfers twice per clock and GDDR5 transfers four times per clock. Confirm the actual memory clock and bus width with `nvidia-smi -q -d CLOCK,MEMORY` when the card is tested.

| Card | Memory | Type | Bus width | Memory clock | Bandwidth |
|---|---|---|---|---|---|
| Quadro K6000 | 12 GB | GDDR5 | 384-bit | 1500 MHz | ~288 GB/s |
| Quadro P4000 | 8 GB | GDDR5 | 256-bit | 1901 MHz | ~243 GB/s |
| Tesla K80 | 2 x 12 GB | GDDR5 | 2 x 384-bit | 1250 MHz | ~240 GB/s per GPU |
| GeForce GTX 770 | 2 or 4 GB | GDDR5 | 256-bit | 1753 MHz | ~224 GB/s |
| Quadro K5200 | 8 GB | GDDR5 | 256-bit | 1500 MHz | ~192 GB/s |
| Tesla K10 | 2 x 4 GB | GDDR5 | 2 x 256-bit | 1250 MHz | ~160 GB/s per GPU |
| Quadro P2000 | 5 GB | GDDR5 | 160-bit | 1752 MHz | ~140 GB/s |
| Quadro P1000 | 4 GB | GDDR5 | 128-bit | 1252 MHz | ~82 GB/s |
| Quadro K1200 | 4 GB | GDDR5 | 128-bit | 1250 MHz | ~80 GB/s |
| Quadro P600 | 2 GB | GDDR5 | 64-bit | 1252 MHz | ~40 GB/s |
| Quadro K620 | 2 GB | DDR3 | 128-bit | 900 MHz | ~28.8 GB/s |

For prefill, compute and newer instructions matter more. For decode, bandwidth and capacity dominate. The benchmark reports both, because a card that wins one phase does not always win the other.

## Inter-GPU links

The K10 and K80 are dual-GPU cards with no NVLink. Their two GPUs communicate over an on-board PCIe switch. That can avoid a trip through the host chipset, depending on the switch and driver, but it is still PCIe, not a dedicated GPU fabric.

The K1200 pair uses two separate PCIe slots. Peer-to-peer support depends on the motherboard and chipset. Because the K1200's memory bandwidth is low, about 80 GB/s, the PCIe link is a smaller relative bottleneck than it is on a K80, which has about 240 GB/s per GPU. That is why two slow cards can scale acceptably without NVLink.

Measure the link before trusting it: `nvidia-smi topo -m`, `p2pBandwidthLatencyTest`, or `nvbandwidth`.

## Runtime cliffs

The modern AI stack assumes newer compute capabilities. The useful work is finding the exact point where each runtime stops.

| Tier | Cards | CUDA | What usually works | What usually does not |
|---|---|---|---|---|
| Kepler 3.0 | K10, GTX 770, K5200, K6000 | 10.2, driver 470 | Kindi, some legacy llama.cpp builds | CUDA 11+, modern PyTorch, bitsandbytes, Unsloth |
| Kepler 3.7 | K80 | 11.4, driver 470 | Kindi, legacy llama.cpp builds | CUDA 12, modern framework wheels |
| Maxwell | K620, K1200 | 12.9, driver 580 | llama.cpp, Ollama, Kindi | CUDA 13, some new kernels |
| Pascal | P600, P1000, P2000, P4000 | 12.9, driver 580 | llama.cpp, Ollama, Kindi | CUDA 13, some new kernels |

These are starting hypotheses, not results. The compatibility matrix replaces them with measured statuses.

## Compatibility matrix

| Runtime | Kepler (K10, K80, GTX 770, K5200, K6000) | Maxwell (K620, K1200) | Pascal (P600, P1000, P2000, P4000) |
|---|---|---|---|
| Kindi | Planned | Planned | Planned |
| llama.cpp legacy | Planned | Planned | Planned |
| llama.cpp current | Expected fail | Planned | Planned |
| Ollama | Unknown | Planned | Planned |

`Planned` means the card is on the shelf and the test is queued. `Expected fail` is a hypothesis from the runtime's documented compute-capability floor, not a measurement. `Unknown` means no attempt yet. A result only counts when it links to a measured page.

Kindi's stated floor is compute capability 3.0. Its vendor-tested list is narrower: Quadro K420, Quadro K1200 (one or two cards), Quadro K6000, GeForce GTX 1080, GeForce RTX 3080, and the AMD Radeon 780M. The rest of the matrix is a candidate list until we measure it.

Kindi also runs a specific model family: the Ternary-Bonsai-2 models (2B, 4B, 9B, 27B) and experimental Nemotron 3.5 Bolt E4B. It is not a general GGUF engine.

## What to record

Every GPU device gets the same record. For the K10 and K80, record each GPU separately:

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
