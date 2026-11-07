---
title: "Hardware"
description: "The cards, the compute capabilities, and the runtime cliffs."
---

LocoFósil starts with the cards on the shelf. The inventory covers Kepler, Maxwell, and Pascal, from 2 GB entry cards to 12 GB server parts. Every card here is CUDA-capable. The limit is the newest toolkit and driver that still target the architecture.

The lab-wide canonical registry, including the benchmark fleet, is at [locolabo.org/gpu-registry](https://locolabo.org/gpu-registry/). This page remains the detailed relic-shelf view with compute, CUDA, and driver specifics.

## Inventory

| Card | Memory | Architecture | Compute capability | Max CUDA | Last driver | Cards | GPU devices |
|---|---|---|---|---|---|---|---|
| GeForce GTX 770 | 2 or 4 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| Tesla K10 | 2 x 4 GB | Kepler | 3.0 | 10.2 | 470 | 2 | 4 |
| Quadro K5200 | 8 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| Quadro K6000 | 12 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| Quadro K4200 | 4 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| Quadro K420 | 2 GB | Kepler | 3.0 | 10.2 | 470 | 1 | 1 |
| GeForce GT 710 | 2 GB | Kepler | 3.5 | 11.4 practical | 470 | 1 | 1 |
| Tesla K80 | 2 x 12 GB | Kepler | 3.7 | 11.4 practical | 470 | 1 | 2 |
| Quadro K620 | 2 GB | Maxwell | 5.0 | 12.9 | 580 | 2 | 2 |
| Quadro K1200 | 4 GB | Maxwell | 5.0 | 12.9 | 580 | 2 | 2 |
| GeForce GTX 960 | 4 GB | Maxwell | 5.2 | 12.9 | 580 | 1 | 1 |
| Quadro M4000 | 8 GB | Maxwell | 5.2 | 12.9 | 580 | 1 | 1 |
| Quadro P600 | 2 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |
| Quadro P1000 | 4 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |
| Quadro P2000 | 5 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |
| Quadro P4000 | 8 GB | Pascal | 6.1 | 12.9 | 580 | 1 | 1 |

The GTX 770 shipped in 2 GB and 4 GB versions. The K420 shipped in 1 GB and 2 GB versions; this one is the 2 GB card. The GT 710 shipped in 1 GB and 2 GB versions; this one is the 2 GB card. The GTX 960 shipped in 2 GB and 4 GB versions; this one is the 4 GB card. Confirm the card before recording results.

The Tesla K10 and K80 are dual-GPU cards: one physical card, two CUDA devices, each with its own memory. A K80 is two 12 GB GPUs, not a single 24 GB pool. A K10 is two 4 GB GPUs. The memory figures above are per GPU. A model must fit on one device unless the runtime splits it across both. `nvidia-smi` lists each GPU separately.

The K1200 is a single-GPU card. Two K1200 cards mean two devices, and they can run one model in tensor parallel or two models as separate servers.

That is 19 cards and 22 GPU devices.

## What the compute level means

Compute capability is the architecture level the CUDA toolkit compiles for. A card is not too old for CUDA. It is limited to the last toolkit and driver that still target its level.

| Architecture | Compute capability | Newest toolkit | Last driver | Notes |
|---|---|---|---|---|
| Kepler | 3.0 | CUDA 10.2 | 470 | K10, GTX 770, K420, K4200, K5200, K6000 |
| Kepler | 3.5 | CUDA 11.4 practical | 470 | GT 710. CUDA 11.8 can target 3.5 and 3.7, but the 470 driver tops out at 11.4. |
| Kepler | 3.7 | CUDA 11.4 practical | 470 | K80. CUDA 11.8 can target 3.5 and 3.7, but the 470 driver tops out at 11.4. |
| Maxwell | 5.0 | CUDA 12.9 | 580 | K620, K1200. CUDA 13.0 dropped Maxwell. |
| Maxwell | 5.2 | CUDA 12.9 | 580 | GTX 960, M4000. CUDA 13.0 dropped Maxwell. |
| Pascal | 6.1 | CUDA 12.9 | 580 | P600, P1000, P2000, P4000. CUDA 13.0 dropped Pascal. |

CUDA 13.0 removed offline compilation for everything below compute capability 7.5: Maxwell, Pascal, and Volta. The 580 driver branch is the last one for those architectures and is supported through mid-2028. Applications built with CUDA 12.x continue to run.

Kepler went earlier. CUDA 11.0 dropped compute capability 3.0 and 3.2. CUDA 12.0 dropped 3.5 and 3.7. Driver 470 is the last Kepler branch, and its support period has ended. That is why Kindi ships a CUDA 10.2 image: it keeps Kepler cards usable after the modern stack moved on.

## VRAM speed and bandwidth

Decode speed tracks memory bandwidth more closely than architecture generation. The K6000 and K80 have more bandwidth than the P1000 and P2000. The P4000 is the fastest Pascal card on the shelf, and the M4000 is the fastest Maxwell card. The GT 710 is the slowest, then the K620 and P600.

These are approximate vendor figures. Memory clock is the base clock, not the effective data rate. DDR3 transfers twice per clock and GDDR5 transfers four times per clock. Confirm the actual memory clock and bus width with `nvidia-smi -q -d CLOCK,MEMORY` when the card is tested.

| Card | Memory | Type | Bus width | Memory clock | Bandwidth |
|---|---|---|---|---|---|
| Quadro K6000 | 12 GB | GDDR5 | 384-bit | 1500 MHz | ~288 GB/s |
| Quadro P4000 | 8 GB | GDDR5 | 256-bit | 1901 MHz | ~243 GB/s |
| Tesla K80 | 2 x 12 GB | GDDR5 | 2 x 384-bit | 1250 MHz | ~240 GB/s per GPU |
| GeForce GTX 770 | 2 or 4 GB | GDDR5 | 256-bit | 1753 MHz | ~224 GB/s |
| Quadro K5200 | 8 GB | GDDR5 | 256-bit | 1500 MHz | ~192 GB/s |
| Quadro M4000 | 8 GB | GDDR5 | 256-bit | 1502 MHz | ~192 GB/s |
| Quadro K4200 | 4 GB | GDDR5 | 256-bit | 1350 MHz | ~173 GB/s |
| Tesla K10 | 2 x 4 GB | GDDR5 | 2 x 256-bit | 1250 MHz | ~160 GB/s per GPU |
| Quadro P2000 | 5 GB | GDDR5 | 160-bit | 1752 MHz | ~140 GB/s |
| GeForce GTX 960 | 4 GB | GDDR5 | 128-bit | 1753 MHz | ~112 GB/s |
| Quadro P1000 | 4 GB | GDDR5 | 128-bit | 1252 MHz | ~82 GB/s |
| Quadro K1200 | 4 GB | GDDR5 | 128-bit | 1250 MHz | ~80 GB/s |
| Quadro P600 | 2 GB | GDDR5 | 64-bit | 1252 MHz | ~40 GB/s |
| Quadro K420 | 2 GB | DDR3 | 128-bit | 891 MHz | ~29 GB/s |
| Quadro K620 | 2 GB | DDR3 | 128-bit | 900 MHz | ~28.8 GB/s |
| GeForce GT 710 | 2 GB | DDR3 | 64-bit | 900 MHz | ~14.4 GB/s |

For prefill, compute and newer instructions matter more. For decode, bandwidth and capacity dominate. The benchmark reports both, because a card that wins one phase does not always win the other.

## Inter-GPU links

The K10 and K80 are dual-GPU cards with no NVLink. Their two GPUs communicate over an on-board PCIe switch. That can avoid a trip through the host chipset, depending on the switch and driver, but it is still PCIe, not a dedicated GPU fabric.

The K1200 pair uses two separate PCIe slots. Peer-to-peer support depends on the motherboard and chipset. Because the K1200's memory bandwidth is low, about 80 GB/s, the PCIe link is a smaller relative bottleneck than it is on a K80, which has about 240 GB/s per GPU. That is why two slow cards can scale acceptably without NVLink.

Measure the link before trusting it: `nvidia-smi topo -m`, `p2pBandwidthLatencyTest`, or `nvbandwidth`.

## Power and the sweet spot

The sweet spot is not the fastest card. It is the card that runs the model you need at the lowest energy per useful token.

These are approximate board power figures. Measure at the wall, including the host, because the PSU and idle draw can dominate at this scale.

| Card | Board power | VRAM | Bandwidth | Likely role |
|---|---|---|---|---|
| GeForce GT 710 | ~19 W | 2 GB | ~14.4 GB/s | Lowest-power 2B, very limited by DDR3 |
| Quadro K620 | ~45 W | 2 GB | ~28.8 GB/s | Low-power 2B, limited by DDR3 |
| Quadro K420 | ~41 W | 2 GB | ~29 GB/s | Low-power 2B, limited by DDR3 |
| Quadro K1200 | ~45 W | 4 GB | ~80 GB/s | 2B and 9B efficiency candidate |
| Quadro P600 | ~40 W | 2 GB | ~40 GB/s | Low-power 2B |
| Quadro P1000 | ~47 W | 4 GB | ~82 GB/s | 2B and 9B |
| Quadro P2000 | ~75 W | 5 GB | ~140 GB/s | 9B with more headroom |
| Quadro P4000 | ~105 W | 8 GB | ~243 GB/s | 27B efficiency candidate |
| Quadro K4200 | ~108 W | 4 GB | ~173 GB/s | 27B on a Kepler card |
| GeForce GTX 960 | ~120 W | 4 GB | ~112 GB/s | 9B on older Maxwell CUDA |
| Quadro M4000 | ~120 W | 8 GB | ~192 GB/s | 27B on a Maxwell card |
| GeForce GTX 770 | ~230 W | 2 or 4 GB | ~224 GB/s | High power, small VRAM |
| Tesla K10 | ~225 W | 2 x 4 GB | ~160 GB/s per GPU | Dual-GPU experiment |
| Quadro K5200 | ~150 W | 8 GB | ~192 GB/s | 27B on a Kepler card |
| Quadro K6000 | ~225 W | 12 GB | ~288 GB/s | 27B capacity and bandwidth |
| Tesla K80 | ~300 W | 2 x 12 GB | ~240 GB/s per GPU | Dual-GPU experiment, cooling challenge |

The working hypothesis:

- 2B and 4B: K1200 or P1000. About 45 W, 4 GB, and around 80 GB/s. The K1200 is already tested with Kindi.
- 9B: P2000 or K1200. The P2000 gives 5 GB and 140 GB/s at about 75 W.
- 27B: P4000 looks like the efficiency candidate at about 105 W and 243 GB/s. The K6000 is the capacity and bandwidth option at about 225 W. Two K1200 cards are the low-power pair at about 90 W total, but tensor parallelism takes some of that advantage back.
- K10 and K80: useful for dual-GPU experiments, not likely efficiency winners. The K80 is 300 W and passive, so cooling is a project in itself.

Cooling is part of the power equation. The K10 and K80 are passive server cards and need high static pressure airflow, a shroud, or an open frame. A standard desktop case will not cool them adequately.

The K10 and K80 are proof-of-concept hardware. They are interesting for dual-GPU topology and Kepler support, but a modern GTX or RTX card is the better default for a daily node. Standard cooling, current CUDA, and better tokens per joule matter more than a cheap 24 GB board. Candidates to price secondhand: GTX 1660 Super 6 GB, RTX 3050 8 GB, RTX 3060 12 GB, RTX 3090 24 GB.

### Practical baseline

The lab already has two comparison cards in the main fleet, not on the relic shelf:

| Card | Board power | VRAM | Bandwidth |
|---|---|---|---|
| RTX 3060 12 GB | ~170 W | 12 GB | 360 GB/s |
| RTX 3090 24 GB | ~350 W | 24 GB | 936 GB/s |

The 3060 is on Hidra. The 3090 is on Puente. The current assignment is in the [LocoBanco GPU inventory](https://locobanco.org/gpu-inventory/).

Price note: the 3090 is often overpriced on the secondhand market because 24 GB and high bandwidth are in demand. The P40 24 GB is the cheaper 24 GB alternative if you can cool a passive server card. The 3060 12 GB remains the value pick. The 3090 on Puente is the comparison ceiling, not a purchase recommendation.

The benchmark measures tokens per joule at the wall. F5 covers the Optiplex plus K1200 node. The other cards get the same measurement once they are on a host.

## Runtime cliffs

The modern AI stack assumes newer compute capabilities. The useful work is finding the exact point where each runtime stops.

| Tier | Cards | CUDA | What usually works | What usually does not |
|---|---|---|---|---|
| Kepler 3.0 | K10, GTX 770, K420, K4200, K5200, K6000 | 10.2, driver 470 | Kindi, some legacy llama.cpp builds | CUDA 11+, modern PyTorch, bitsandbytes, Unsloth |
| Kepler 3.5 | GT 710 | 11.4, driver 470 | Kindi, legacy llama.cpp builds | CUDA 12, modern framework wheels |
| Kepler 3.7 | K80 | 11.4, driver 470 | Kindi, legacy llama.cpp builds | CUDA 12, modern framework wheels |
| Maxwell | K620, K1200, GTX 960, M4000 | 12.9, driver 580 | llama.cpp, Ollama, Kindi | CUDA 13, some new kernels |
| Pascal | P600, P1000, P2000, P4000 | 12.9, driver 580 | llama.cpp, Ollama, Kindi | CUDA 13, some new kernels |

These are starting hypotheses, not results. The compatibility matrix replaces them with measured statuses.

## Compatibility matrix

| Runtime | Kepler (K10, K80, GTX 770, GT 710, K420, K4200, K5200, K6000) | Maxwell (K620, K1200, GTX 960, M4000) | Pascal (P600, P1000, P2000, P4000) |
|---|---|---|---|
| Kindi | Planned | Planned | Planned |
| llama.cpp legacy | Planned | Planned | Planned |
| llama.cpp current | Expected fail | Planned | Planned |
| Ollama | Unknown | Planned | Planned |

`Planned` means the card is on the shelf and the test is queued. `Expected fail` is a hypothesis from the runtime's documented compute-capability floor, not a measurement. `Unknown` means no attempt yet. A result only counts when it links to a measured page.

Kindi's stated floor is compute capability 3.0. Its vendor-tested list is narrower: Quadro K420, Quadro K1200 (one or two cards), Quadro K6000, GeForce GTX 1080, GeForce RTX 3080, and the AMD Radeon 780M. The rest of the matrix is a candidate list until we measure it.

Kindi also runs a specific model family: the Ternary-Bonsai-2 models (2B, 4B, 9B, 27B) and experimental Nemotron 3.5 Bolt E4B. It is not a general GGUF engine.

## What to record

Every GPU device gets the same record. Bringing a card online is the [setup runbook](/setup/). For the K10 and K80, record each GPU separately:

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
