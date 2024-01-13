<script>
	import TableIdSelect from '../../lib/table/TableIdSelect.svelte';
	import RunComplex from './RunComplex.svelte';

	let table_id = 'main';
	let run_trigger = false;
	async function run() {
		//trigger the run function of the RunProtocol child
		run_trigger = true;
		console.log('run begins');
	}

	function handleCompletion() {
		console.log('done!');
	}
</script>

<TableIdSelect bind:table_id />
<RunComplex {table_id} {run_trigger} />

<button class="btn variant-filled" type="button" on:click={run}>Run</button>

<style>
	th {
		text-align: left;
	}
</style>
