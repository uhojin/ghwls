<script lang="ts">
	import StatusDot from '$lib/components/StatusDot.svelte';

	let { data } = $props();
	const active = $derived(data.projects.filter((p) => p.status === 'Active').length);
</script>

<svelte:head>
	<title>Projects — Hojin You</title>
</svelte:head>

<h1 class="meta heading">projects — {active} active / {data.projects.length} total</h1>
<ul class="rows">
	{#each data.projects as project, i}
		<li class="rise" style="--i: {i}">
			<a class="row" href="/projects/{project.slug}">
				<span>
					<StatusDot status={project.status} />
					{project.name}
					<span class="meta desc">{project.description}</span>
				</span>
				<span class="meta">{project.status.toLowerCase()}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.heading { text-transform: uppercase; letter-spacing: 0.08em; margin: 2.5rem 0 0.25rem; }
	.desc { display: block; margin-left: 0.95rem; color: var(--text-faint); }
</style>
