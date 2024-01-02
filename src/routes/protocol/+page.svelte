<script>
	import Table from '$lib/table/Table.svelte';
	import { instruments_store } from '$lib/stores.js';
	let ports = [];
	let names = [];
	instruments_store.subscribe((instruments) => {
		instruments.forEach((instrument) => {
			ports = [...ports, instrument.port];
			names = [...names, instrument.name];
		});
	});

	let options = {
		'Instrument Name': names
	};
</script>

<div class="p-2">
	<Table id={'protocol'} {options} />
</div>
