<script>
	import { instruments_store, tables_store } from '$lib/stores.js';
	import { step_names } from '$lib/steps.js';
	export let table_id;
	let all_tables;
	let table;
	let steps = [];
	let instruments;

	// instruments_store is used to translate name to port
	// 'Instrument Name', 'Step', 'Args'
	instruments_store.subscribe((data) => {
		instruments = data;
	});

	// tables_store provides the protocol table
	tables_store.subscribe((tables) => {
		all_tables = tables;
	});

	function reactivityShield() {
		// I am putting this code in here so that it doesn't trigger reactivity
		// I only want the following reactivity block to be triggered by changes to table_id
		// without this shield, it would also be triggered by changes to steps
		console.log('reactivity');
		table = all_tables[table_id];
		steps = table.data.map((row) => {
			let step_class = step_names[row[1]];
			let instrument = instruments.find((ins) => {
				return ins.name == row[0];
			});
			// args does not include port num
			let args = row[2].split(',');
			// args_list actually goes to the Step object
			let args_list = [instrument.port].concat(args);
			let step = new step_class((args_list = args_list));
			return step;
		});
	}
	$: if (table_id) {
		reactivityShield();
	}
</script>

<table class="table m-4" style="background:none">
	<tr>
		<th>URL</th>
		<th>Args</th>
	</tr>
	{#each steps as step}
		<tr class={step.is_active ? 'text-primary-500' : ''}>
			<td> {step.url} </td>
			<td> {step.args_list} </td>
		</tr>
	{/each}
</table>

<style>
	th {
		text-align: left;
	}
</style>
