import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: "/portfolio-page/",
	plugins: [sveltekit()]
});
