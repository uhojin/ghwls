import { getPosts, getProjects } from '$lib/content';

export const load = () => ({
	projects: getProjects().filter((p) => p.featured).slice(0, 4),
	posts: getPosts().slice(0, 4)
});
