<script lang="ts">
	let {
		status,
		message,
		pathname
	}: { status: number; message?: string; pathname?: string } = $props();
</script>

<div class="err">
	<p class="meta">[{status}] {status === 404 ? 'route not found' : message}</p>
	{#if pathname}<p class="meta path">$ requested: {pathname}</p>{/if}
	<a class="meta" href="/">← return to index</a>
</div>

<style>
	.err { margin: 5rem 0; }
	.path { color: var(--text-dim); margin: 0.5rem 0 1.5rem; }
	a:hover { color: var(--text); }
</style>
