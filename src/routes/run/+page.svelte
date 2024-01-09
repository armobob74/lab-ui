<script>
	import { tables_store } from '$lib/stores.js';
	import { step_names } from '$lib/steps.js';

	// 'Instrument Name', 'Step', 'Args', 'id', 'wait for'
	let protocol_table;
	tables_store.subscribe((tables) => {
		protocol_table = tables['protocol'];
	});
</script>

<h2>Steps:</h2>

<ul>
	{#each protocol_table.data as row}
		<li>
			{row[0]} | {row[1]} | {row[2]}
		</li>
	{/each}
</ul>
