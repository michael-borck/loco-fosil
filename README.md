# LocoFósil

Second-life GPUs, measured. Useful local inference on hardware the modern stack left behind.

Site: https://locofosil.org

## What this is

LocoFósil extends the [LocoBanco](https://locobanco.org) floor downward: Kepler, Maxwell, Pascal, Turing, and old server cards, measured for capability, watts, and cost. The first reference build is an Optiplex plus a Quadro K1200 running Kindi and a ternary 2B model.

**Hardware:** GeForce GTX 770, 2x Tesla K10, Tesla K80, Quadro K5200, K6000, K620, 2x K1200, P600, P1000, P2000, P4000

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
