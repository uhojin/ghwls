import { error } from '@sveltejs/kit';
import type { PostMeta } from '$lib/content';
import type { Component } from 'svelte';

const modules = import.meta.glob('/content/writing/*.md');

export const csr = false;

export const entries = () =>
	Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()!.replace(/\.md$/, '')
	}));

export async function load({ params }: { params: { slug: string } }) {
	const loader = modules[`/content/writing/${params.slug}.md`];
	if (!loader) error(404, 'post not found');
	const mod = (await loader()) as { default: Component; metadata: PostMeta };
	return { content: mod.default, meta: mod.metadata };
}
