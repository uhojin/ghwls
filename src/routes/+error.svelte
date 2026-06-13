<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="err">
	<p class="meta">[{page.status}] {page.status === 404 ? 'route not found' : page.error?.message}</p>
	<p class="meta path">$ requested: {page.url.pathname}</p>
	<a class="meta" href="/">← return to index</a>
</div>

<style>
	.err { margin: 5rem 0; }
	.path { color: var(--text-dim); margin: 0.5rem 0 1.5rem; }
	a:hover { color: var(--text); }
</style>
