import { error } from '@sveltejs/kit';
import type { ProjectMeta } from '$lib/content';
import { slugFromPath } from '$lib/content-helpers';
import type { Component } from 'svelte';

const modules = import.meta.glob('/content/projects/*.md');

export const csr = false;

export const entries = () =>
	Object.keys(modules).map((path) => ({ slug: slugFromPath(path) }));

export async function load({ params }: { params: { slug: string } }) {
	const loader = modules[`/content/projects/${params.slug}.md`];
	if (!loader) error(404, 'project not found');
	const mod = (await loader()) as { default: Component; metadata: ProjectMeta };
	return { content: mod.default, meta: mod.metadata };
}
