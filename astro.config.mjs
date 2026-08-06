import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // printdefect.com (2026-08-06). NÃO usar printfixer.com: pertence a outra
  // empresa (correção de cor de foto) — canonical apontando para domínio de
  // terceiro faz o Google atribuir nosso conteúdo a ele.
  site: 'https://printdefect.com',
  integrations: [sitemap()],
});
