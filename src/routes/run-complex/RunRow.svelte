<script>
	import { createEventDispatcher } from 'svelte';
	import RunProtocol from '../run-protocol/RunProtocol.svelte';
	export let row;
	export let run_trigger = false;

	let unfinished_protocols;
	const dispatch = createEventDispatcher();
	$: if (row) {
		unfinished_protocols = row.length;
	}
	function handleCompletion() {
		unfinished_protocols -= 1;
		if (unfinished_protocols === 0) {
			dispatchEvent('rowCompleted');
		}
	}
</script>

{#each row as table_id}
	<RunProtocol {table_id} {run_trigger} on:runCompleted={handleCompletion} />
{/each}
