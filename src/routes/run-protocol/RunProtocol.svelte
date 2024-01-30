<script>
	import { createEventDispatcher } from 'svelte';
	import { instruments_store, tables_store } from '$lib/stores.js';
	import { step_names } from '$lib/steps.js';
	export let table_id;
	export let run_trigger = false; //if set to true by parent, run begins
	export let stop_flag = false;
	let all_tables;
	let table;
	let steps = [];
	let instruments;

	const INVALID_FORMAT_LABEL = 'BAD FORMAT'; // used to indicate that user needs to change args
	// disables run button if an arg is invalid
	// I already tried dispatching events, but that didn't work out
	// so have parents listen directly to this flag
	export let invalid_format_flag = false;
	const dispatch = createEventDispatcher();

	// instruments_store is used to translate name to port
	// 'Instrument Name', 'Step', 'Args'
	instruments_store.subscribe((data) => {
		instruments = data;
	});

	// tables_store provides the protocol table
	tables_store.subscribe((tables) => {
		all_tables = tables;
	});

	function reactivityShield() {
		// I am putting this code in here so that it doesn't trigger reactivity
		// I only want the following reactivity block to be triggered by changes to table_id
		// without this shield, it would also be triggered by changes to steps
		table = all_tables[table_id];
		steps = table.data.map((row) => {
			let step_class = step_names[row[1]];
			let instrument = instruments.find((ins) => {
				return ins.name == row[0];
			});
			// args does not include port num
			let args_string = `[${row[2]}]`;
			let args;
			try {
				args = JSON.parse(args_string);
			} catch (SyntaxError) {
				args = [INVALID_FORMAT_LABEL];
				invalid_format_flag = true;
			}
			// args_list actually goes to the Step object
			let args_list = [instrument.port].concat(args);
			let step = new step_class((args_list = args_list));
			step.instrument_name = instrument.name;
			step.name = row[1];
			return step;
		});
	}
	$: if (table_id) {
		reactivityShield();
	}

	async function run() {
		for (let i = 0; i < steps.length; i++) {
			let step = steps[i];
			step.is_active = true;
			//trigger reactivity
			steps = steps;
			while (stop_flag) {
				await new Promise((resolve) => setTimeout(resolve, 500)); // Pause for 0.5 sec
				// wait for stop_flag to be set to false
			}
			await step.action();
			step.is_active = false;
		}
		// trigger reactivity again so that the last line
		// does not stay green
		steps = steps;
	}

	$: if (run_trigger) {
		run().then(() => {
			dispatch('runCompleted');
			//setting back to false makes the stop buttons disappear
			run_trigger = false;
		});
	}
</script>

<div>
	{#if run_trigger}
		{#if stop_flag}
			<button on:click={() => (stop_flag = false)} class="btn variant-filled-primary">RESUME</button
			>
		{:else}
			<button on:click={() => (stop_flag = true)} class="btn variant-filled-warning">STOP</button>
		{/if}
	{/if}
</div>

<table class="table m-4" style="background:none">
	<tr>
		<th>Instrument</th>
		<th>Step</th>
	</tr>
	{#each steps as step}
		<tr class={step.is_active ? 'text-primary-500' : ''}>
			<td>{step.instrument_name}</td>
			<td>
				{step.name}(
				{#if step.args_list.includes(INVALID_FORMAT_LABEL)}
					<span class="text-error-500">BAD FORMAT</span>
				{:else}
					<span>{step.args_list.slice(1)}</span>
				{/if}
				)
			</td>
		</tr>
	{/each}
</table>

<style>
	th {
		text-align: left;
	}
</style>
