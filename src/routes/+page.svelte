<script lang="ts">
	import StatusDot from '$lib/components/StatusDot.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Hojin You</title>
	<meta name="description" content="Software engineer — infra, automation, and small delightful things." />
</svelte:head>

<p class="intro rise">
	Software engineer. I keep systems boring and side projects interesting.
</p>

<section>
	<h2 class="meta">projects — featured</h2>
	<ul class="rows">
		{#each data.projects as project, i}
			<li class="rise" style="--i: {i + 1}">
				<a class="row" href="/projects/{project.slug}">
					<span><StatusDot status={project.status} /> {project.name}</span>
					<span class="meta">{project.status.toLowerCase()}</span>
				</a>
			</li>
		{/each}
	</ul>
	<a class="meta more" href="/projects">all projects →</a>
</section>

<section>
	<h2 class="meta">writing — recent</h2>
	<ul class="rows">
		{#each data.posts as post, i}
			<li class="rise" style="--i: {i + 5}">
				<a class="row" href="/writing/{post.slug}">
					<span>{post.title}</span>
					<span class="meta">{post.date}</span>
				</a>
			</li>
		{/each}
	</ul>
	<a class="meta more" href="/writing">all writing →</a>
</section>

<style>
	.intro { font-size: 1.05rem; max-width: 28rem; margin: 2.5rem 0 3rem; }
	section { margin-bottom: 3rem; }
	h2 { text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.25rem; }
	.more { display: inline-block; margin-top: 0.75rem; }
	.more:hover { color: var(--text); }
</style>
