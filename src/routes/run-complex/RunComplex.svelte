<script>
	import { tables_store } from '$lib/stores.js';
	import RunRow from './RunRow.svelte';
	export let table_id;
	export let run_trigger;
	export let invalid_format_flag = false;
	import { createEventDispatcher } from 'svelte';
	let data;
	let columns;
	let run_triggers;
	let next_row_idx = 0;
	let dispatch = createEventDispatcher();

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
		if (next_row_idx < run_triggers.length) {
			console.log('running row', next_row_idx);

			if (next_row_idx > 0) {
				run_triggers[next_row_idx - 1] = false;
			}
			run_triggers[next_row_idx] = true;
		} else {
			dispatch('runCompleted');
		}
		next_row_idx += 1;
	}
	$: if (run_trigger) {
		runNextRow();
	}
</script>

{#if columns.length === 0}
	<div class="flex flex-col">
		{#each data as row, idx}
			<div class="flex flex-row">
				<RunRow
					{row}
					run_trigger={run_triggers[idx]}
					on:rowCompleted={runNextRow}
					bind:invalid_format_flag
				/>
			</div>
		{/each}
	</div>
{:else}
	<h2 class="text-error-500">Error: please select the main tab (this one has headers)</h2>
{/if}
