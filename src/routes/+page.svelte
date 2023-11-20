<script>
	import { onMount } from 'svelte';
	import InstrumentCard from './InstrumentCard.svelte';
	import { instruments_store } from '$lib/stores.js';
	let instrumentFormHidden = true;

	//binded to values of #new-instrument-form
	let newInstrument = {
		name: '',
		type: '',
		port: 0
	};

	let instruments = [];
	instruments_store.subscribe((value) => {
		instruments = value;
	});

	function createInstrument() {
		let instrumentCopy = { ...newInstrument };

		let port_is_unique = true;
		instruments.forEach((instrument) => {
			if (instrument.port == newInstrument.port) {
				port_is_unique = false;
			}
		});

		if (!port_is_unique) {
			alert('New instrument must run on a unique port!');
		} else {
			//instruments = [...instruments, instrumentCopy];
			instruments_store.update((old) => {
				return [...old, instrumentCopy];
			});
			hideInstrumentForm();
		}
	}
	function showInstrumentForm() {
		instrumentFormHidden = false;
	}
	function hideInstrumentForm() {
		instrumentFormHidden = true;
	}
</script>

<div
	class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 gap-4 p-4"
>
	{#each instruments as instrument}
		<InstrumentCard {...instrument} />
	{/each}
	<button
		class="flex flex-col items-center justify-center card card-hover aspect-square cursor-pointer variant-ghost text-center"
		on:click={showInstrumentForm}
		type="button"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="64"
			height="64"
			fill="currentColor"
			class="bi bi-plus"
			viewBox="0 0 16 16"
		>
			<path
				d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
			/>
		</svg>
	</button>
</div>
<div class="card m-4 p-4" hidden={instrumentFormHidden}>
	<button class="" on:click={hideInstrumentForm}>x</button>
	<form id="new-instrument-form" class="flex flex-col items-center gap-4">
		<div>
			<label for="type">Type</label>
			<select bind:value={newInstrument.type} class="select" name="type">
				<option>SPM</option>
				<option>SmartStageXY</option>
			</select>
			<label for="port">Port</label>
			<input bind:value={newInstrument.port} type="text" class="input p-3" name="port" />
			<label for="name">Name</label>
			<input bind:value={newInstrument.name} type="text" class="input p-3" name="name" />
		</div>
		<button class="btn variant-filled-primary" type="button" on:click={createInstrument}
			>Create Instrument</button
		>
	</form>
</div>
