---
title: "FAQ"
description: "Common questions about LocoFósil."
---

## Are these cards obsolete?

For training and for the modern CUDA stack, mostly yes. For inference of small quantized or ternary models, no. The project measures where the line actually is instead of assuming it.

## Why Nvidia first?

The secondhand supply, the drivers, and the tooling are Nvidia-heavy. One platform documented properly is more useful than three platforms documented badly. AMD and Intel results are welcome as community contributions once the Nvidia matrix is stable.

## What is Kindi?

A custom inference engine for Ternary-Bonsai models, from Kepler to Ampere. It is an engine with an OpenAI-compatible server, not a harness. It is one of the runtimes LocoFósil benchmarks.

## What is the minimum CUDA baseline?

Kepler compute capability 3.0 runs on CUDA 10.2 and the 470 driver branch. The K80 is 3.7, which CUDA 11.x can target, but the 470 driver tops out at 11.4. Maxwell and Pascal run on CUDA 12.9 and the 580 driver. CUDA 13.0 dropped Maxwell, Pascal, and Volta. The compatibility matrix records where each runtime stops, card by card.

## Is this a LocoBanco track?

No. LocoBanco covers modern consumer VRAM tiers. LocoFósil covers the hardware below that floor, including server cards and Kepler-era parts that the modern stack has dropped.

## Can I contribute?

Yes. Open an issue with the card, driver, CUDA version, runtime, model, generation speed, prompt processing speed, wall power, and any failures. Results for AMD and Intel are welcome.

## Why "Fósil"?

The hardware is old, not dead. The name is a joke about the secondhand shelf, not a claim that the cards are useless. The tagline is "second-life GPUs, measured."
