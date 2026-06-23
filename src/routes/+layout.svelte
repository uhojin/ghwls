<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children, data } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="shell">
	<Nav />
	<main>{@render children()}</main>
	<Footer buildInfo={data.buildInfo} />
</div>

<style>
	.shell {
		max-width: 44rem;
		margin: 0 auto;
		padding: 0 1.25rem;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}
	main { flex: 1; display: flex; flex-direction: column; }
</style>
