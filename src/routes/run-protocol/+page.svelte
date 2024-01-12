<script>
	import TableIdSelect from '../../lib/table/TableIdSelect.svelte';
	import RunProtocol from './RunProtocol.svelte'

	let table_id;

	async function run() {
		for (let i = 0; i < steps.length; i++) {
			let step = steps[i];
			console.log('running step',i)
			step.is_active = true;
			//trigger reactivity
			steps = steps;
			await step.action();
			step.is_active = false;
		}
	}
</script>
<TableIdSelect bind:table_id />
<RunProtocol {table_id}/>

<button class="btn variant-filled" type="button" on:click={run}>Run</button>

<style>
	th {
		text-align: left;
	}
</style>
