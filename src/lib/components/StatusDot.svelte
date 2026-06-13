<script lang="ts">
	let { status }: { status: 'Active' | 'Archived' } = $props();
</script>

<span class="dot" class:active={status === 'Active'} aria-hidden="true"></span>

<style>
	.dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--text-faint);
		margin-right: 0.35rem;
		vertical-align: 2px;
	}
	.dot.active {
		background: var(--accent);
		animation: pulse 2.4s ease-out infinite;
	}
	@media (prefers-reduced-motion: reduce) {
		.dot.active { animation: none; }
	}
</style>
