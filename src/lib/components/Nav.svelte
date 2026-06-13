<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'index' },
		{ href: '/projects', label: 'projects' },
		{ href: '/writing', label: 'writing' },
		{ href: '/about', label: 'about' }
	];

	const isCurrent = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header>
	<a href="/" class="name">Hojin You</a>
	<nav class="meta">
		{#each links as link, i}
			{#if i > 0}<span class="sep" aria-hidden="true">/</span>{/if}
			<a href={link.href} class:current={isCurrent(link.href)} aria-current={isCurrent(link.href) ? 'page' : undefined}>{link.label}</a>
		{/each}
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 1.5rem 0;
	}
	.name { font-weight: 600; font-size: 0.9rem; }
	nav a { color: var(--text-faint); }
	nav a:hover { color: var(--text); }
	nav a.current { color: var(--accent); }
	.sep { margin: 0 0.4rem; color: var(--line); }
</style>
