<script>
	import Table from '$lib/table/Table.svelte';
	import { instruments_store } from '$lib/stores.js';
	import TableIdSelect from '../../lib/table/TableIdSelect.svelte';
	import { step_names } from '$lib/steps.js';
	let ports = [];
	let names = [];
	instruments_store.subscribe((instruments) => {
		instruments.forEach((instrument) => {
			ports = [...ports, instrument.port];
			names = [...names, instrument.name];
		});
	});

	let options = {
		'Instrument Name': names,
		Step: Object.keys(step_names)
	};
	let table_id = localStorage.getItem('active-protocol') || undefined;
	console.log('id', table_id);
</script>

<a href="/protocol/new" class="btn variant-filled">New Table</a>
<TableIdSelect bind:table_id />
<div class="p-2">
	<Table id={table_id} {options} />
</div>
