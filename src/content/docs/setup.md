---
title: "Setup"
description: "Bringing a host and card online, from driver branch to first benchmark."
---

This is the bring-up runbook for the relic shelf. The main fleet rig (Colmena) is documented in the [LocoBanco docs](https://locobanco.org). The rules here apply to any card in the [inventory](/hardware/): match the driver to the oldest card in the host, verify before measuring, and record what the machine reports, not what the datasheet promised.

## Match the host to the card

The card must physically and electrically fit the host before any software runs.

| Card | Aux power | Slot | Fits an SFF Optiplex |
|---|---|---|---|
| GeForce GT 710 | None | Single, low profile | Yes |
| Quadro K420 | None | Single, low profile | Yes |
| Quadro K620 | None | Single, low profile | Yes |
| Quadro K1200 | None | Single, low profile | Yes |
| Quadro P600 | None | Single, low profile | Yes |
| Quadro P1000 | None | Single | Yes |
| Quadro P2000 | None | Single | Yes |
| Quadro P4000 | None | Single | Marginal. No connector but draws ~105 W through the slot. |
| GeForce GTX 960 | 1 x 6-pin | Dual | No |
| Quadro K4200 | 1 x 6-pin | Single, full height | No |
| Quadro M4000 | 1 x 6-pin | Single, full height | No |
| GeForce GTX 770 | 2 x 6-pin | Dual | No |
| Quadro K5200 | 1 x 6-pin | Dual | No |
| Quadro K6000 | 2 x 6-pin | Dual, blower | No |
| Tesla K10 | 8-pin server | Dual, passive | No |
| Tesla K80 | 8-pin CPU | Dual, passive | No |

Low-power single-slot cards need no aux power and run in an SFF Optiplex with its stock PSU. Everything else wants a mid-tower or workstation chassis with a 400 to 500 W PSU and the spare connectors. The K10 and K80 additionally need an airflow plan; see [cooling](#cooling).

## One host, one driver branch

The driver must support the oldest card in the host. Mixing architectures in one machine pins the whole machine to the older branch, so plan hosts around this.

| Architecture | Cards | Driver branch | Status |
|---|---|---|---|
| Kepler 3.0 / 3.5 / 3.7 | K10, GTX 770, GT 710, K420, K4200, K5200, K6000, K80 | 470 | Last Kepler branch. Support has ended. Install from the distro archive if it is gone from the repos. |
| Maxwell / Pascal | K620, K1200, GTX 960, M4000, P600, P1000, P2000, P4000 | 580 | Last branch for these architectures. Supported through mid-2028. |

A host with any Kepler card runs the 470 branch, and that host cannot serve Maxwell or Pascal cards at their newest toolkit. The cleaner pattern is one host per driver branch: Kepler hosts and modern hosts stay separate.

## Bring-up checklist

Run these in order and record every output. This is the same list as [what to record](/hardware/#what-to-record), in execution order.

1. Seat the card, connect aux power if it needs it, boot.
2. `nvidia-smi`. Confirm the device is listed with the expected memory and the driver plus CUDA versions. Save the output.
3. `nvidia-smi -q -d CLOCK,MEMORY`. Confirm memory type and clock against the [bandwidth table](/hardware/#vram-speed-and-bandwidth). Vendor figures are approximate; this is the measurement.
4. `nvidia-smi topo -m` on multi-GPU hosts. Record the topology.
5. Update the inventory row on the hardware page with the confirmed figures.

A card that fails step 2 on a 470 host usually has a newer card installed alongside it, or the driver branch is wrong for the architecture.

## Runtimes

| Runtime | Runs on | Setup | First check |
|---|---|---|---|
| Kindi | Kepler, Maxwell, Pascal, and the comparison cards | One-command installer, or build the Docker image from the [Kindi repo](https://github.com/ahtx/kindi). Server starts on `127.0.0.1:8093`. | `kindi verify` must pass before any benchmark is recorded |
| llama.cpp, current | Maxwell, Pascal | Build against the CUDA 12.x toolkit on the 580 driver | `llama-bench` |
| llama.cpp, legacy | Kepler | Build against CUDA 10.2 on the 470 driver | `llama-bench` |
| lm-evaluation-harness | Maxwell and Pascal only | PyTorch with CUDA 12.x. Not on Kepler. | One small task before the full suite |

`kindi verify` compares output token-for-token against llama.cpp. A benchmark from a server that has not passed verify does not count.

## Validation targets

The Kindi project publishes measured numbers for cards on our shelf. Reproduce these before claiming our own results, so a slow number means our setup, not the card.

| Card | Model | Expected generation speed |
|---|---|---|
| Quadro K420 2 GB | Ternary-Bonsai 2B | ~20.9 tok/s exact, ~24.1 fast head |
| Quadro K1200 | 2B / 4B / 9B | 81.0 / 39.2 / 23.4 tok/s |
| 2x Quadro K1200 | 27B | 12.6 tok/s |
| Quadro K6000 | 27B | 20.4 tok/s |

Source: the [Kindi benchmarks](https://github.com/ahtx/kindi/blob/main/docs/BENCHMARKS.md). If we reproduce within a reasonable margin, the host, driver, and runtime are sound and the interesting measurements can start.

## Power measurement

- Plug the host through a power meter at the wall. Board power figures are approximations; tokens per joule is measured, not estimated.
- Record idle power for at least five minutes after boot, then sustained load during a long generation.
- Record idle and load for each card in the host, not just the whole node, where the PSU allows per-card reasoning. Otherwise record the node as configured and say so.

## Cooling

- The K10 and K80 are passive server cards. They need an open frame, a shroud, or high static pressure airflow directed across the fins. A standard desktop case will not cool them.
- The K6000 blower is self-contained but loud; it belongs in a tower, not a desk-side open frame next to a microphone.
- The low-profile Quadros are fan-cooled and fine in an SFF, but an SFF heats up with the P4000's slot draw. Watch temperatures in the first long run.

## Status

The shelf is documented; the hosts are being rebuilt. Each card gets its bring-up checklist output recorded before its row in the [compatibility matrix](/hardware/#compatibility-matrix) moves from `Planned`.
