import { slugFromPath, byDateDesc, byOrderDesc } from './content-helpers';

export interface PostMeta {
	title: string;
	description?: string;
	date: string; // ISO YYYY-MM-DD
	tags?: string[];
	featured?: boolean;
}
export interface PostEntry extends PostMeta {
	slug: string;
}

export interface ProjectMeta {
	name: string;
	description: string;
	status: 'Active' | 'Archived';
	image?: {
		url: string;
		alt: string;
		size?: 'vertical' |'small' | 'medium' | 'large';
		position?: string;
		scale?: string;
		hoverPosition?: string;
		hoverScale?: string;
		coverPosition?: string;
	};
	techStack?: string[];
	order?: number;
	featured?: boolean;
	githubUrl?: string;
	liveUrl?: string;
	postUrl?: string;
	figmaUrl?: string;
	figmaPrototypeUrl?: string;
	videoUrl?: string;
	videoPortrait?: boolean;
	challenges?: string[];
	solutions?: string[];
	technicalDetails?: string;
	learnings?: string[];
	futurePlans?: string[];
}
export interface ProjectEntry extends ProjectMeta {
	slug: string;
	order: number;
}

const postModules = import.meta.glob('/content/writing/*.md', { eager: true }) as Record<
	string,
	{ metadata: PostMeta }
>;
const projectModules = import.meta.glob('/content/projects/*.md', { eager: true }) as Record<
	string,
	{ metadata: ProjectMeta }
>;

export function getPosts(): PostEntry[] {
	return Object.entries(postModules)
		.map(([path, mod]) => ({ slug: slugFromPath(path), ...mod.metadata }))
		.sort(byDateDesc);
}

export function getProjects(): ProjectEntry[] {
	return Object.entries(projectModules)
		.map(([path, mod]) => ({ slug: slugFromPath(path), order: 0, ...mod.metadata }))
		.sort(byOrderDesc);
}
