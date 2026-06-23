import { execFileSync } from 'node:child_process';

const git = (...args: string[]) => {
	try {
		return execFileSync('git', args, { encoding: 'utf8' }).trim();
	} catch {
		return 'unknown';
	}
};

// Derive deploy metadata from whichever CI platform built the site, falling back
// to local git. Nothing about the host is hardcoded in the UI — adding a new
// platform is one more entry here.
const env = process.env;

const host = env.CF_PAGES
	? 'cloudflare'
	: env.VERCEL
		? 'vercel'
		: env.NETLIFY
			? 'netlify'
			: env.GITHUB_ACTIONS
				? 'github'
				: 'local';

const branch =
	env.CF_PAGES_BRANCH ??
	env.VERCEL_GIT_COMMIT_REF ??
	env.BRANCH ??
	git('rev-parse', '--abbrev-ref', 'HEAD');

const ciSha = env.CF_PAGES_COMMIT_SHA ?? env.VERCEL_GIT_COMMIT_SHA ?? env.GITHUB_SHA;
const hash = ciSha ? ciSha.slice(0, 7) : git('rev-parse', '--short', 'HEAD');

export const buildInfo = {
	time: new Date().toISOString().slice(0, 16) + 'Z',
	host,
	branch,
	hash
};
