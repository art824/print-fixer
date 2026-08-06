import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // NÃO usar printfixer.com — pertence a outra empresa (correção de cor de foto).
  // Enquanto não houver domínio próprio, apontar para o endereço que realmente
  // serve o site: canonical apontando para domínio de terceiro faz o Google
  // atribuir nosso conteúdo a ele.
  site: 'https://print-fixer.pages.dev',
  integrations: [sitemap()],
});
