<script>
	import { tables_store } from '$lib/stores.js';
	import { step_names } from '$lib/steps.js';
	import { instruments_store } from '$lib/stores.js';

	// 'Instrument Name', 'Step', 'Args'
	let instruments;
	instruments_store.subscribe((data) => {
		instruments = data;
	});

	let protocol_table;
	let steps = ['A'];
	tables_store.subscribe((tables) => {
		protocol_table = tables['protocol'];
		steps = protocol_table.data.map((row) => {
			let step_class = step_names[row[1]];
			let instrument = instruments.find((ins) => {
				return ins.name == row[0];
			});
			// args does not include port num
			let args = row[2].split(',');
			console.log(args);
			// args_list actually goes to the Step object
			let args_list = [instrument.port].concat(args);
			let step = new step_class((args_list = args_list));
			return step;
		});
	});

	async function run() {
		for (let i = 0; i < steps.length; i++) {
			let step = steps[i];
			step.is_active = true;
			steps = steps; //trigger reactivity
			await step.action();
			step.is_active = false;
		}
	}
</script>

<table class="table m-4" style="background:none">
	<tr>
		<th>URL</th>
		<th>Args</th>
	</tr>
	{#each steps as step}
		<tr class={step.is_active ? 'text-primary-500' : ''}>
			<td> {step.url} </td>
			<td> {step.args_list} </td>
		</tr>
	{/each}
</table>
<button class="btn variant-filled" type="button" on:click={run}>Run</button>

<style>
	th {
		text-align: left;
	}
</style>
