import fs from 'node:fs';
import path from 'node:path';

const SRC = '/Users/hojin/repos/uhojin.github.io/blog/src/content/posts';
const OUT_CONTENT = 'content/writing';
const OUT_IMAGES = 'static/images/writing';
const IMG_EXT = /\.(png|jpe?g|gif|webp|svg)$/i;

fs.mkdirSync(OUT_CONTENT, { recursive: true });

const normalizeSlug = (name) => name.replace(/\.md$/, '').replaceAll('_', '-').toLowerCase();

function transformFrontmatter(fm) {
	const get = (key) =>
		fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? '';
	const tags = fm.match(/^tags:\s*(\[.*\])\s*$/m)?.[1] ?? '[]';
	return {
		draft: get('draft') === 'true',
		header: [
			'---',
			`title: "${get('title')}"`,
			`description: "${get('description')}"`,
			`date: "${get('published')}"`,
			`tags: ${tags}`,
			'---'
		].join('\n')
	};
}

// :::type[Title]\n...\n:::  ->  blockquote with bold title line
function convertAdmonitions(body) {
	return body.replace(
		/^:::(\w+)(?:\[(.*?)\])?\s*\n([\s\S]*?)^:::\s*$/gm,
		(_, type, title, inner) => {
			const heading = `> **${title || type.toUpperCase()}**\n>\n`;
			const quoted = inner
				.trimEnd()
				.split('\n')
				.map((l) => `> ${l}`.trimEnd())
				.join('\n');
			return `${heading}${quoted}`;
		}
	);
}

// relative image refs -> /images/writing/<slug>/<file>
const rewriteImagePaths = (body, slug) =>
	body.replace(/(!\[[^\]]*\]\()(?!https?:\/\/|\/)([^)]+)(\))/g, `$1/images/writing/${slug}/$2$3`);

for (const entry of fs.readdirSync(SRC, { withFileTypes: true })) {
	if (entry.name.startsWith('.')) continue;
	let mdPath = null;
	let assetDir = null;
	if (entry.isDirectory()) {
		mdPath = path.join(SRC, entry.name, 'post.md');
		assetDir = path.join(SRC, entry.name);
		if (!fs.existsSync(mdPath)) continue;
	} else if (entry.name.endsWith('.md')) {
		mdPath = path.join(SRC, entry.name);
	} else continue;

	const slug = normalizeSlug(entry.name);
	const raw = fs.readFileSync(mdPath, 'utf8');
	const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\s*\n?/);
	if (!fmMatch) { console.error(`NO FRONTMATTER, skipped: ${slug}`); continue; }
	const { draft, header } = transformFrontmatter(fmMatch[1]);
	if (draft) { console.log(`skip draft: ${slug}`); continue; }

	let body = raw.slice(fmMatch[0].length);
	body = convertAdmonitions(body);
	if (assetDir) {
		const images = fs.readdirSync(assetDir).filter((f) => IMG_EXT.test(f));
		if (images.length) {
			const outDir = path.join(OUT_IMAGES, slug);
			fs.mkdirSync(outDir, { recursive: true });
			for (const f of images) fs.copyFileSync(path.join(assetDir, f), path.join(outDir, f));
		}
		body = rewriteImagePaths(body, slug);
	}
	fs.writeFileSync(path.join(OUT_CONTENT, `${slug}.md`), `${header}\n\n${body}`);
	console.log(`migrated: ${slug}`);
}
