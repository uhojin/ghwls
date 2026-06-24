<script lang="ts">
	import StatusDot from '$lib/components/StatusDot.svelte';
	import Pager from '$lib/components/Pager.svelte';

	let { data } = $props();
	const Content = $derived(data.content);
	const meta = $derived(data.meta);

	const sections = $derived(
		[
			{ label: 'challenges', items: meta.challenges },
			{ label: 'solutions', items: meta.solutions },
			{ label: 'learnings', items: meta.learnings },
			{ label: 'future', items: meta.futurePlans }
		].filter((s) => s.items?.length)
	);

	// the video (when present) takes the first rise slot; everything below shifts down one
	const base = $derived(meta.videoUrl ? 1 : 0);
</script>

<svelte:head>
	<title>{meta.name} — Hojin You</title>
	<meta name="description" content={meta.description} />
</svelte:head>

<article>
	<header class="rise">
		<p class="meta"><a href="/projects">← projects</a></p>
		<h1><StatusDot status={meta.status} /> {meta.name}</h1>
		<p class="desc">{meta.description}</p>
		<p class="meta links">
			{#if meta.techStack?.length}<span>[{meta.techStack.join(', ').toLowerCase()}]</span>{/if}
			{#if meta.githubUrl}<a href={meta.githubUrl} target="_blank" rel="noopener noreferrer">source ↗</a>{/if}
			{#if meta.liveUrl}<a href={meta.liveUrl} target="_blank" rel="noopener noreferrer">live ↗</a>{/if}
			{#if meta.figmaUrl}<a href={meta.figmaUrl} target="_blank" rel="noopener noreferrer">design ↗</a>{/if}
			{#if meta.figmaPrototypeUrl}<a href={meta.figmaPrototypeUrl} target="_blank" rel="noopener noreferrer">prototype ↗</a>{/if}
			{#if meta.postUrl}<a href={meta.postUrl}>writeup →</a>{/if}
		</p>
	</header>

	{#if meta.videoUrl}
		<div class="video rise" class:portrait={meta.videoPortrait} style="--i: 1">
			<iframe
				src={meta.videoUrl}
				title="{meta.name} demo"
				loading="lazy"
				allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	{/if}

	{#if meta.technicalDetails}
		<section class="rise" style="--i: {base + 1}">
			<h2 class="meta">overview</h2>
			<p>{meta.technicalDetails}</p>
		</section>
	{/if}

	{#each sections as section, i}
		<section class="rise" style="--i: {base + i + 2}">
			<h2 class="meta">{section.label}</h2>
			<ul>
				{#each section.items ?? [] as item}<li>{item}</li>{/each}
			</ul>
		</section>
	{/each}

	<div class="prose rise" style="--i: {base + sections.length + 2}">
		<Content />
	</div>

	<Pager prev={data.prev} next={data.next} indexHref="/projects" indexLabel="all projects" />
</article>

<style>
	article { flex: 1; display: flex; flex-direction: column; }
	header { margin: 2.5rem 0 2rem; }
	header .meta a:hover { color: var(--text); }
	h1 { font-size: 1.6rem; margin: 0.5rem 0 0.25rem; display: flex; align-items: center; }
	.desc { color: var(--text-dim); margin: 0 0 0.75rem; }
	.video { margin-bottom: 2rem; max-width: var(--measure); aspect-ratio: 16 / 9; }
	.video.portrait { aspect-ratio: 9 / 16; max-width: 22rem; margin-inline: auto; }
	.video iframe { display: block; width: 100%; height: 100%; border: 1px solid var(--line); }
	.links { display: flex; gap: 1rem; flex-wrap: wrap; }
	.links a:hover { color: var(--text); }
	section { margin-bottom: 2rem; max-width: var(--measure); }
	h2 { text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.25rem; }
	ul { margin: 0; padding-left: 1.1rem; color: var(--text-dim); }
	li { margin: 0.3rem 0; }
</style>
