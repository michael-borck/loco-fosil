---
title: "Build tiers"
description: "What a $150, $300, or $500 total build can actually run."
---

The point of LocoFosil is the total cost, not the card alone. A $200 GPU in a $400 host is a $600 node. A $50 GPU in a $100 Optiplex is a $150 node. The second one is often the more interesting result.

These are ballpark secondhand prices in AUD, Perth, late 2026. Check current listings. Shipping, power connectors, and cooling can change the total.

At a hard $100 total, the honest answer is CPU inference or a free host. A GPU node starts around $150 to $200 total.

## The tiers

| Total build | Card | Host | VRAM | Model | Expected |
|---|---|---|---|---|---|
| ~$150 | Quadro K1200 or P1000 | SFF Optiplex, 16 GB RAM | 4 GB | Ternary 2B and 9B | 2B fast, 9B usable |
| ~$300 | Quadro P2000 or P4000 | Mid-tower Optiplex or used desktop | 5 to 8 GB | 9B and 27B | 9B comfortable, 27B slower |
| ~$500 | P40 24 GB or 2x K1200 | Used workstation with cooling | 8 to 24 GB | 27B and larger | Capacity over speed |
| ~$600+ | RTX 3060 12 GB | Used gaming PC | 12 GB | 9B to 27B | Modern CUDA and efficiency |

## The $150 floor

- Used SFF Optiplex with an i5, 16 GB RAM, and a small SSD: about $100 to $150.
- Quadro K1200 4 GB or P1000 4 GB: about $40 to $80.
- Total: about $150 to $220.

What it runs: Ternary-Bonsai 2B with Kindi at about 81 tok/s, 9B at about 23 tok/s, and 4B in between. It serves an OpenAI-compatible endpoint. It handles short chat, summaries, shell one-liners, tool calls, and simple extraction. It is a thinking-partner node, not a frontier replacement.

Limits: 4 GB per GPU, about 80 GB/s, and no 27B unless you add a second card. The SFF power supply limits you to low-power cards.

## The $300 practical

- Used mid-tower Optiplex or desktop with a 400 to 500 W power supply: about $150 to $250.
- Quadro P2000 5 GB, Quadro P4000 8 GB, or GTX 1660 Super 6 GB: about $100 to $250.
- Total: about $300 to $450.

What it runs: 9B comfortably, and 27B with the 8 GB cards at lower speed. The P4000 has 243 GB/s and CUDA 12.9 support. The 1660 Super has 336 GB/s but only 6 GB. The P2000 is low power and fits smaller cases.

Limits: 27B is possible but not fast. Long context and large batches will hit VRAM.

## The $500 capacity

- Used workstation or server chassis with adequate cooling: about $200 to $300.
- P40 24 GB or 2x K1200: about $200 to $300.
- Total: about $450 to $600.

What it runs: 24 GB of VRAM for 27B and larger models, or two K1200 cards for 27B at low power. The P40 is 346 GB/s, 250 W, passive, Pascal, and CUDA 12.9. It needs high static pressure airflow and a server power connector.

Limits: The P40 is a server card, so cooling is a project. The 2x K1200 pair is slower but much lower power.

## What the money buys

| Budget | What you get | What you give up |
|---|---|---|
| ~$150 | 2B and 9B at low power | 27B, long context, fast prefill |
| ~$300 | 9B comfortably, 27B slowly | Modern CUDA on the Kepler cards |
| ~$500 | 24 GB and larger models | Low power and simple cooling |
| ~$600+ | Modern CUDA and better tokens per joule | The lowest total cost |

## The rule

Measure the total, not the card. A $200 card that needs a $300 host and a $100 cooler is a $600 node. A $50 card in a $100 Optiplex is a $150 node. The second one is the project.
