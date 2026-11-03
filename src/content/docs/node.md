---
title: "Low-power node"
description: "The Optiplex plus K1200 reference build."
---

The reference node is deliberately modest: a secondhand Optiplex, one or two Quadro K1200 cards, a small SSD, and a power meter. The point is not to build the fastest local AI machine. The point is to find the smallest machine that is still useful.

## Why this build

- The K1200 is cheap, low-power, and widely available secondhand.
- Maxwell has a current driver branch, so the software stack is less fragile than Kepler.
- A 4 GB card is enough for a ternary 2B model and, in pairs, a 27B model at a usable speed.
- The Optiplex form factor is quiet, small, and easy to power.

## Parts

| Part | Role | Status |
|---|---|---|
| Optiplex host | CPU, RAM, storage, case | Model to confirm |
| Quadro K1200 4 GB | Inference | 2 available |
| Power meter | Wall power measurement | Needed |
| SSD | OS and model files | TBD |
| Linux | Host OS | Ubuntu 22.04 or 24.04 |

No prices are listed until the build is complete and the secondhand costs are recorded.

## Software

1. Install Linux and the current Nvidia driver for Maxwell.
2. Install Kindi. It targets low-cost Nvidia cards and serves an OpenAI-compatible endpoint.
3. Download a Ternary-Bonsai model. Start with the 2B, then test the 9B and the 27B on two cards.
4. Point a client at the endpoint and run the task suite.

The expected endpoint is `http://localhost:8093/v1` with Kindi's default model id. That detail is confirmed when the node is built.

## What we measure

- Idle power, load power, and power during prompt processing
- Tokens per second at short and long context
- Tokens per joule
- Thermal behaviour in the Optiplex case
- Stability over a 24-hour run
- Task success on the lightweight harness

## Status

Planned. The first milestone is a single K1200 running the 2B model at the wall, with a measured tokens per joule figure. The second milestone adds the second card and the 27B model.

Dated build notes will live at [LocoNotas](https://loconotas.org).
