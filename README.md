# LocoFósil

Second-life GPUs, measured. Useful local inference on hardware the modern stack left behind.

Site: https://locofosil.org

## What this is

LocoFósil extends the [LocoBanco](https://locobanco.org) floor downward: Kepler, Maxwell, Pascal, Turing, and old server cards, measured for capability, watts, and cost. The first reference build is an Optiplex plus a Quadro K1200 running Kindi and a ternary 2B model.

**Hardware:** GeForce GTX 770, GeForce GT 710, GeForce GTX 960, 2x Tesla K10, Tesla K80, Quadro K420, K4200, K5200, K6000, K620, 2x K1200, P600, P1000, P2000, P4000

The K10 and K80 are dual-GPU cards. The memory is per GPU, not pooled: a K80 is two 12 GB devices, and a K10 is two 4 GB devices.

## CUDA support

All cards are CUDA-capable. The limit is the newest toolkit that still targets each architecture.

| Architecture | Cards | Max CUDA | Last driver |
|---|---|---|---|
| Kepler 3.0 | K10, GTX 770, K420, K4200, K5200, K6000 | 10.2 | 470 |
| Kepler 3.5 | GT 710 | 11.4 practical | 470 |
| Kepler 3.7 | K80 | 11.4 practical | 470 |
| Maxwell 5.0 | K620, K1200 | 12.9 | 580 |
| Maxwell 5.2 | GTX 960 | 12.9 | 580 |
| Pascal 6.1 | P600, P1000, P2000, P4000 | 12.9 | 580 |

CUDA 13.0 dropped Maxwell, Pascal, and Volta. Driver 580 is the last branch for those architectures and is supported through mid-2028. Kepler is limited to CUDA 10.2 for compute capability 3.0 and CUDA 11.4 in practice for the K80 at 3.7. Driver 470 is the last Kepler branch.

## Local development

```bash
npm install
npm run dev
```

## Deploy

Push to `main`. The `Deploy to GitHub Pages` workflow builds the Starlight site and publishes it.

## Related

- [LocoBanco](https://locobanco.org)
- [LocoLLM](https://locollm.org)
- [LocoAgente](https://locoagente.org)
- [LocoMusa](https://locomusa.org)
- [LocoNotas](https://loconotas.org)
- [LocoLabo](https://locolabo.org)

## Licence

MIT
