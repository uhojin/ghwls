export function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '');
}

export function byDateDesc(a: { date: string }, b: { date: string }): number {
	return b.date.localeCompare(a.date);
}

export function byOrderDesc(a: { order: number }, b: { order: number }): number {
	return b.order - a.order;
}
