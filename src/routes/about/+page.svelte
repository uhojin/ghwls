<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>About — Hojin You</title>
</svelte:head>

<h1 class="meta heading">about</h1>
<p class="bio rise">
	Software engineer based in Canada. I like infrastructure, automation, and building
	small tools that do one thing well.
	<a class="meta resume" href="/resume.pdf">resume.pdf →</a>
</p>

<section>
	<h2 class="meta">work</h2>
	<Timeline items={data.work} />
</section>

<section>
	<h2 class="meta">education</h2>
	<Timeline items={data.education} />
</section>

<style>
	.heading { text-transform: uppercase; letter-spacing: 0.08em; margin: 2.5rem 0 0.25rem; }
	.bio { max-width: 28rem; margin: 0.5rem 0 2.5rem; }
	.resume { display: block; margin-top: 0.75rem; }
	.resume:hover { color: var(--text); }
	section { margin-bottom: 2.5rem; }
	h2 { text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
</style>
