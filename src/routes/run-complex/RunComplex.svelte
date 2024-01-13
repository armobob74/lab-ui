<script>
	import { tables_store } from '$lib/stores.js';
	import RunRow from './RunRow.svelte';
	export let table_id;
	export let run_trigger;
	let data;
	let columns;
	let run_triggers;
	let active_row_idx = 0;

	$: if (table_id) {
		tables_store.subscribe((tables) => {
			let table = tables[table_id];
			data = table.data;
			// columns.length must be equal to zero
			// otherwise it's a protocol sheet, not a main sheet
			columns = table.columns;
			run_triggers = Array(data.length).fill(false);
		});
	}
	function runNextRow() {
		run_triggers[active_row_idx] = true;
		active_row_idx += 1;
	}

	$: if (run_trigger) {
		runNextRow();
	}
</script>

{#if columns.length === 0}
	{#each data as row, idx}
		<RunRow {row} run_trigger={run_triggers[idx]} on:rowCompleted={runNextRow} />
		<hr />
	{/each}
{:else}
	<h2 class="text-error-500">Error: first row is supposed to be blank</h2>
{/if}
