// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';


// https://astro.build/config
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'Fal.github.io';
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'vickycliffjapardhana';
const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const base = isUserSite ? '/' : `/${repo}/`;

export default defineConfig({
	site: `https://${owner}.github.io${base}`,
	base,
	output: 'static',
	integrations: [mdx(), sitemap(),],
	
});
