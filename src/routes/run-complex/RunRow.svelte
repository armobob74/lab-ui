<script>
	import { createEventDispatcher } from 'svelte';
	import RunProtocol from '../run-protocol/RunProtocol.svelte';
	export let row;
	export let run_trigger = false;
	let stop_flags = Array(row.length).fill(false);
	let unfinished_protocols;
	const dispatch = createEventDispatcher();
	$: if (row) {
		unfinished_protocols = row.length;
	}
	function handleCompletion() {
		unfinished_protocols -= 1;
		if (unfinished_protocols === 0) {
			dispatch('rowCompleted');
		}
	}
</script>

{#if run_trigger}
	{#if stop_flags.every((val) => val)}
		<button
			on:click={() => (stop_flags = stop_flags.fill(false))}
			class="btn variant-filled-primary">RESUME ROW</button
		>
	{:else}
		<button on:click={() => (stop_flags = stop_flags.fill(true))} class="btn variant-filled-warning"
			>STOP ROW</button
		>
	{/if}
{/if}
{#each row as table_id, i}
	<RunProtocol
		{table_id}
		{run_trigger}
		bind:stop_flag={stop_flags[i]}
		on:runCompleted={handleCompletion}
	/>
{/each}
