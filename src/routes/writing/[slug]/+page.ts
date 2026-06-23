import { error } from '@sveltejs/kit';
import { getPosts, type PostMeta } from '$lib/content';
import { slugFromPath } from '$lib/content-helpers';
import type { Component } from 'svelte';

const modules = import.meta.glob('/content/writing/*.md');

export const csr = false;

export const entries = () =>
	Object.keys(modules).map((path) => ({ slug: slugFromPath(path) }));

export async function load({ params }: { params: { slug: string } }) {
	const loader = modules[`/content/writing/${params.slug}.md`];
	if (!loader) error(404, 'post not found');
	const mod = (await loader()) as { default: Component; metadata: PostMeta };

	// Neighbours in date-desc order: prev = newer (up the index), next = older.
	const posts = getPosts();
	const i = posts.findIndex((p) => p.slug === params.slug);
	const prev = i > 0 ? posts[i - 1] : null;
	const next = i >= 0 && i < posts.length - 1 ? posts[i + 1] : null;

	return {
		content: mod.default,
		meta: mod.metadata,
		prev: prev ? { href: `/writing/${prev.slug}`, label: prev.title } : null,
		next: next ? { href: `/writing/${next.slug}`, label: next.title } : null
	};
}
