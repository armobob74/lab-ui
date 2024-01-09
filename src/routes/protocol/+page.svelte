<script>
	import Table from '$lib/table/Table.svelte';
	import { instruments_store } from '$lib/stores.js';
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
</script>

<div class="p-2">
	<Table id={'protocol'} {options} />
</div>
