<script>
	import TableIdSelect from '../../lib/table/TableIdSelect.svelte';
	import RunProtocol from './RunProtocol.svelte';

	let table_id;
	let run_trigger = false;
	let invalid_format_flag = false;

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
<RunProtocol bind:invalid_format_flag {table_id} {run_trigger} on:runCompleted={handleCompletion} />

{#if !invalid_format_flag}
	<button class="btn variant-filled" type="button" on:click={run}>Run</button>
{:else}
	<button class="btn variant-filled" type="button" disabled>Invalid Args</button>
{/if}

<style>
	th {
		text-align: left;
	}
</style>
