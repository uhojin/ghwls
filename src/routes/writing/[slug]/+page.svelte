<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.meta.title} — Hojin You</title>
	{#if data.meta.description}
		<meta name="description" content={data.meta.description} />
	{/if}
</svelte:head>

<article>
	<header class="rise">
		<p class="meta">
			<a href="/writing">← writing</a>
		</p>
		<h1>{data.meta.title}</h1>
		{#if data.meta.description}<p class="desc">
				{data.meta.description}
			</p>{/if}
		<p class="meta">
			{data.meta.date}
			{#if data.meta.tags?.length}· {data.meta.tags
					.join(", ")
					.toLowerCase()}{/if}
		</p>
	</header>
	<div class="prose rise" style="--i: 2">
		<Content />
	</div>
</article>

<style>
	header {
		margin: 2.5rem 0 2rem;
	}
	header .meta a:hover {
		color: var(--text);
	}
	h1 {
		font-size: 1.6rem;
		margin: 0.5rem 0 0.25rem;
	}
	.desc {
		color: var(--text-dim);
		margin: 0;
	}
	
</style>
