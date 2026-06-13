import { getPosts } from '$lib/content';

export const load = () => ({ posts: getPosts() });
