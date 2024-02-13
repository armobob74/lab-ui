<script>
	import Table from '$lib/table/Table.svelte';
	import { instruments_store } from '$lib/stores.js';
	import TableIdSelect from '../../lib/table/TableIdSelect.svelte';
	import { step_names } from '$lib/steps.js';
	let ports = [];
	let names = [];
	let types = [];
	instruments_store.subscribe((instruments) => {
		instruments.forEach((instrument) => {
			ports = [...ports, instrument.port];
			names = [...names, instrument.name];
			types = [...types, instrument.type];
		});
	});

	// allow certain columns of the Table to utilize <select>
	// these options are static and do not depend on other rows
	let options = {
		'Instrument Name': names
	};

	// determine the options based on a function and a row_input
	// format: Column: [row_idx, function]
	let filtered_options = {
		Step: [
			0,
			(instrument_name) => {
				let idx = names.indexOf(instrument_name);
				let instrument_type = types[idx];
				let step_names_keys = Object.keys(step_names);
				let filtered_options = step_names_keys.filter((key) => {
					let step = new step_names[key]([0, 0, 0, 0, 0, 0, 0, 0]);
					return step.instrument_type == instrument_type;
				});
				return filtered_options;
			}
		]
	};
	let table_id = localStorage.getItem('active-protocol') || undefined;
	console.log('id', table_id);
</script>

<a href="/protocol/new" class="btn variant-filled">New Table</a>
<TableIdSelect bind:table_id />
<div class="p-2">
	<Table id={table_id} {options} {filtered_options} />
</div>
