import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		alias: {
			$stores: 'src/stores',
		}
	}
};

export default config;