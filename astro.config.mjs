// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import github from '@astrojs/github-pages';


// https://astro.build/config
export default defineConfig({
	site: 'https://vickycliffjapardhana.github.io',
  base: '/',
	integrations: [mdx(), sitemap(), github()],
	
});
