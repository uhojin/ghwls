import { execFileSync } from 'node:child_process';

const git = (...args: string[]) => {
	try {
		return execFileSync('git', args, { encoding: 'utf8' }).trim();
	} catch {
		return 'unknown';
	}
};

export const buildInfo = {
	time: new Date().toISOString().slice(0, 16) + 'Z',
	branch: git('rev-parse', '--abbrev-ref', 'HEAD'),
	hash: git('rev-parse', '--short', 'HEAD')
};
