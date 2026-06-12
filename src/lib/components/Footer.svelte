<script lang="ts">
	let { buildInfo }: { buildInfo: { time: string; branch: string; hash: string } } = $props();
</script>

<footer class="meta">
	<span>last_deploy: {buildInfo.time} · vercel · {buildInfo.branch}@{buildInfo.hash}</span>
	<span><a href="https://github.com/uhojin">github</a></span>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 2.5rem 0 2rem;
		margin-top: 4rem;
		border-top: 1px solid var(--line);
	}
	a:hover { color: var(--text); }
</style>
