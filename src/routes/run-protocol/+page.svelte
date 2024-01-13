<script>
	import TableIdSelect from '../../lib/table/TableIdSelect.svelte';
	import RunProtocol from './RunProtocol.svelte'

	let table_id;
	let run_trigger = false;

	async function run(){
		//trigger the run function of the RunProtocol child?
		run_trigger = true;
		console.log("run begins")
	}

	function handleCompletion(){
		console.log("done!")
	}

</script>
<TableIdSelect bind:table_id />
<RunProtocol {table_id} {run_trigger} on:runCompleted={handleCompletion}/>

<button class="btn variant-filled" type="button" on:click={run}>Run</button>

<style>
	th {
		text-align: left;
	}
</style>
