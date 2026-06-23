<script lang="ts">
	interface Item {
		title: string;
		company: string;
		date: string;
		description: string[];
	}
	let { items }: { items: Item[] } = $props();
</script>

<ol>
	{#each items as item, i}
		<li class="rise" style="--i: {i}">
			<div class="row">
				<span><strong>{item.title}</strong> <span class="company">· {item.company}</span></span>
				<span class="meta">{item.date}</span>
			</div>
			<ul>
				{#each item.description as line}<li>{line}</li>{/each}
			</ul>
		</li>
	{/each}
</ol>

<style>
	ol { list-style: none; margin: 0; padding: 0; }
	ol > li { border-left: 1px solid var(--line); padding: 0 0 1.5rem 1.25rem; position: relative; }
	ol > li::before {
		content: '';
		position: absolute;
		left: -3.5px;
		top: 1.2rem;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--text-faint);
	}
	ol > li:first-child::before { background: var(--accent); }
	.company { color: var(--text-dim); }
	ul { margin: 0.4rem 0 0; padding-left: 1.1rem; color: var(--text-dim); font-size: 0.9rem; }
	ul li { margin: 0.2rem 0; }
</style>
