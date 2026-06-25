<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import ErrorView from '$lib/components/ErrorView.svelte';
</script>

<svelte:head>
	<title>404 — Hojin You</title>
</svelte:head>

<!-- Prerendered to build/404.html (Cloudflare serves it for unmatched routes).
     Styled content ships without JS; the requested path is filled after hydration. -->
<ErrorView status={404} pathname={browser ? page.url.pathname : undefined} />
