import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

// Shift every Markdown body heading down one level so each detail page's own
// <h1> (post/project title) stays the single page-level heading. Operating on
// the mdast means `#` characters inside fenced code blocks are left untouched.
function remarkShiftHeadings() {
	return (tree) => {
		const visit = (node) => {
			if (node.type === 'heading' && node.depth < 6) node.depth += 1;
			if (node.children) node.children.forEach(visit);
		};
		visit(tree);
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({ extensions: ['.md'], remarkPlugins: [remarkShiftHeadings] })
	],
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;
