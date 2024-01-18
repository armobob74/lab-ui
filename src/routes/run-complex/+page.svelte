<script>
	import TableIdSelect from '../../lib/table/TableIdSelect.svelte';
	import RunComplex from './RunComplex.svelte';

	let table_id = 'main';
	let run_trigger = false;
	let run_in_progress = false;
	let run_completed = false;
	async function run() {
		//trigger the run function of the RunComplex child
		run_trigger = true;
		run_in_progress = true;
		console.log('run begins');
	}

	function handleCompletion() {
		run_in_progress = false;
		run_completed = true;
	}
</script>

<TableIdSelect bind:table_id />
<RunComplex {table_id} {run_trigger} on:runCompleted={handleCompletion} />

{#if run_in_progress}
	<button disabled="true" class="btn variant-filled" type="button" on:click={run}>running</button>
{:else if run_completed}
	<button class="btn variant-filled" type="button" on:click={() => document.location.reload()}
		>Reload</button
	>
{:else}
	<button class="btn variant-filled" type="button" on:click={run}>Run</button>
{/if}

<style>
	th {
		text-align: left;
	}
</style>
