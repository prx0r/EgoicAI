import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  fonts: [
    {
      name: 'Share Tech Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ['normal'],
    },
    {
      name: 'Inter',
      cssVariable: '--font-sans',
      provider: fontProviders.fontsource(),
      weights: [300, 400, 500],
      styles: ['normal'],
    },
  ],
});
