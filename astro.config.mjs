import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loco } from '@locolabo/theme';

export default defineConfig({
  site: 'https://locofosil.org',
  integrations: [
    starlight(
      loco({
        project: 'loco-fosil',
        title: 'LocoFósil',
        description: 'Second-life GPUs, measured. Useful local inference on hardware the modern stack left behind.',
        home: 'https://locofosil.org',
        github: 'loco-fosil',
        accent: { low: '#2a1608', main: '#d97706', high: '#fcd9a8' },
        social: [{ icon: 'external', label: 'LocoNotas', href: 'https://loconotas.org' }],
        logo: {
          alt: 'LocoFósil',
          src: './src/assets/art/icon.png',
          replacesTitle: false,
        },
        sidebar: [
          {
            label: 'LocoFósil',
            items: [
              { label: 'Hardware', slug: 'hardware' },
              { label: 'Setup', slug: 'setup' },
              { label: 'Benchmarks', slug: 'benchmarks' },
              { label: 'Low-power node', slug: 'node' },
              { label: 'Build tiers', slug: 'builds' },
              { label: 'Lightweight harness', slug: 'harness' },
              { label: 'Findings', slug: 'findings' },
              { label: 'FAQ', slug: 'faq' },
            ],
          },
        ],
      })
    ),
  ],
});
