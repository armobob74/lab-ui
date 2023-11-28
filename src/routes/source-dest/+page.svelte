<script>
	import Table from '$lib/table/Table.svelte';
	import { instruments_store } from '$lib/stores.js';
	let ports = [];
	instruments_store.subscribe((instruments) => {
		instruments.forEach((instrument) => {
			ports = [...ports, instrument.port];
		});
	});
	let options = { Port: ports };
</script>

<Table id={'sourceDest'} {options} />
