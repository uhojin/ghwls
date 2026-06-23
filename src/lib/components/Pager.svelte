<script lang="ts">
	interface Link {
		href: string;
		label: string;
	}
	let {
		prev,
		next,
		indexHref,
		indexLabel
	}: {
		prev: Link | null;
		next: Link | null;
		indexHref: string;
		indexLabel: string;
	} = $props();
</script>

<nav class="pager meta">
	<span class="slot prev">
		{#if prev}<a href={prev.href}>← {prev.label}</a>{/if}
	</span>
	<a class="index" href={indexHref}>{indexLabel}</a>
	<span class="slot next">
		{#if next}<a href={next.href}>{next.label} →</a>{/if}
	</span>
</nav>

<style>
	.pager {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line);
	}
	.slot {
		flex: 1;
		min-width: 0;
	}
	.slot a {
		color: var(--text-dim);
	}
	.slot a:hover {
		color: var(--text);
	}
	.next {
		text-align: right;
	}
	.index {
		flex-shrink: 0;
		color: var(--text-faint);
	}
	.index:hover {
		color: var(--text);
	}
</style>
