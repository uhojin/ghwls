<script lang="ts">
	let {
		buildInfo
	}: { buildInfo: { time: string; host: string; branch: string; hash: string } } = $props();
</script>

<footer class="meta">
	<span>last_deploy: {buildInfo.time} · {buildInfo.host} · {buildInfo.branch}@{buildInfo.hash}</span>
	<span><a href="https://github.com/uhojin">github</a></span>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 2.5rem 0 2.5rem;
		margin-top: 1rem;
		border-top: 1px solid var(--line);
	}
	a:hover { color: var(--text); }
</style>