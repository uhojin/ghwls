<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Writing — Hojin You</title>
</svelte:head>

<h1 class="meta heading">writing — {data.posts.length} entries</h1>
<ul class="rows">
	{#each data.posts as post, i}
		<li class="rise" style="--i: {i}">
			<a class="row" href="/writing/{post.slug}">
				<span>
					{post.title}
					{#if post.tags?.length}
						<span class="meta tags">{post.tags.join(', ').toLowerCase()}</span>
					{/if}
				</span>
				<span class="meta">{post.date}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.heading { text-transform: uppercase; letter-spacing: 0.08em; margin: 2.5rem 0 0.25rem; }
	.tags { margin-left: 0.6rem; }
</style>
