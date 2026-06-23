import { error } from '@sveltejs/kit';
import { getProjects, type ProjectMeta } from '$lib/content';
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

	// Neighbours in order-desc order, matching the projects index ordering.
	const projects = getProjects();
	const i = projects.findIndex((p) => p.slug === params.slug);
	const prev = i > 0 ? projects[i - 1] : null;
	const next = i >= 0 && i < projects.length - 1 ? projects[i + 1] : null;

	return {
		content: mod.default,
		meta: mod.metadata,
		prev: prev ? { href: `/projects/${prev.slug}`, label: prev.name } : null,
		next: next ? { href: `/projects/${next.slug}`, label: next.name } : null
	};
}
