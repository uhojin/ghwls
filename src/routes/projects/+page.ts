import { getProjects } from '$lib/content';

export const load = () => ({ projects: getProjects() });
