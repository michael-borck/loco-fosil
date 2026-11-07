import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://locofosil.org',
  integrations: [
    starlight({
      title: 'LocoFósil',
      description: 'Second-life GPUs, measured. Useful local inference on hardware the modern stack left behind.',
      favicon: '/favicon.svg',
      disable404Route: true,
      logo: {
        alt: 'LocoFósil',
        src: './src/assets/fosil.svg',
        replacesTitle: false,
      },
      social: [
        { icon: 'external', label: 'Home', href: 'https://locofosil.org' },
        { icon: 'external', label: 'LocoLabo', href: 'https://locolabo.org' },
        { icon: 'external', label: 'LocoNotas', href: 'https://loconotas.org' },
        { icon: 'github', label: 'GitHub', href: 'https://github.com/michael-borck/loco-fosil' },
      ],
      customCss: ['./src/styles/custom.css'],
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
        {
          label: 'LocoLabo Projects',
          items: [
            { label: 'All Projects', link: 'https://locolabo.org/projects/' },
            { label: 'LocoLabo', link: 'https://locolabo.org' },
            { label: 'LocoLLM', link: 'https://locollm.org' },
            { label: 'LocoBanco', link: 'https://locobanco.org' },
            { label: 'LocoBench Picker', link: 'https://picker.locobanco.org' },
            { label: 'LocoMusa', link: 'https://locomusa.org' },
            { label: 'LocoConvoy', link: 'https://lococonvoy.org' },
            { label: 'LocoAgente', link: 'https://locoagente.org' },
            { label: 'LocoPuente', link: 'https://locopuente.org' },
            { label: 'LocoEnsayo', link: 'https://locoensayo.org' },
            { label: 'LocoNotas', link: 'https://loconotas.org' },
            { label: 'LocoBase', link: 'https://github.com/michael-borck/loco-base' },
          ],
        },
      ],
    }),
  ],
});
