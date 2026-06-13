import fs from 'node:fs';
import matter from 'gray-matter';

export interface ExperienceItem {
	title: string;
	company: string;
	date: string;
	description: string[];
}

export const load = () => {
	const { data } = matter(fs.readFileSync('content/experience.md', 'utf8'));
	return {
		work: (data.work ?? []) as ExperienceItem[],
		education: (data.education ?? []) as ExperienceItem[]
	};
};
