---
title: "Lightweight harness"
description: "A small orchestration layer for 2B models on old hardware."
---

Kindi is an inference engine, not a harness. It serves an OpenAI-compatible endpoint. The harness sits above it and decides what to ask, what to check, and when to stop.

## Why a harness

A 2B model is not going to match a frontier model on raw capability. The interesting question is how much structure can recover. A harness can narrow the task, force a verification step, and keep the model inside a small action space. That is the same bet LocoAgente makes with larger local models, applied at the floor.

## The shape

1. Take one task with a checkable result.
2. Give the model one tool and one narrow instruction.
3. Require a verification step before the answer is accepted.
4. Record the trace: prompt, tool call, result, final answer, latency, tokens, watts.
5. Run it 20 times and report the pass rate, not one good demo.

## Initial tasks

| Task | Check | Why |
|---|---|---|
| Write a shell one-liner | Run it and compare the output | Short, checkable, common |
| Summarise a fixed document | Compare against a required fact list | Tests long-context reading |
| Refactor a small function | Run the tests | Tests code edits and verification |
| Use one tool | Inspect the tool call and the final answer | Tests the harness contract |

## Metrics

Pass rate, turns per task, time to first token, total latency, tokens, and wall energy. A harness that improves the pass rate but triples the energy is not automatically a win.

## Links

- [LocoAgente](https://locoagente.org): orchestration patterns for local models
- [LocoMusa](https://locomusa.org): thinking-partner quality, pairwise judged
- [LocoLLM](https://locollm.org): adapters and model evaluation

## Status

Planned. The first version will be a small Python script, not a framework. If the pattern survives contact with the 2B model, it can be folded into LocoAgente.
