<script>
	export let name; // string
	export let type; // string
	export let port; // string but should parse to an int
	import { instruments_store } from '$lib/stores.js';
	import ConnectionStatus from '../lib/ConnectionStatus.svelte';

	let instruments = [];
	instruments_store.subscribe((value) => {
		instruments = value;
	});
	let iconFromType = {
		SPM: '[ SPM ]',
		SmartStageXY: '[ SmartStageXY ]',
		DLIPower: '[ DLI Power ]'
	};
	function deleteCard() {
		instruments_store.update((current_instruments) => {
			return current_instruments.filter((instrument) => {
				return instrument.port != port;
			});
		});
	}
</script>

<div class="card instrument-card aspect-square flex flex-col items-end">
	<button
		on:click={deleteCard}
		type="button"
		class="delete-btn btn variant-soft-warning aspect-square m-2 p-1">X</button
	>
	<div class="container text-center flex flex-col justify-evenly">
		<p>
			{iconFromType[type]}
		</p>
		<div>
			<h3>{name}</h3>
			<ConnectionStatus {port}>{port}</ConnectionStatus>
		</div>
		<div class="links">
			{#if type == 'SPM'}
				<a target="_blank" class="btn variant-filled" href="http://localhost:{port}">interface</a>
			{:else if type == 'SmartStageXY'}
				<a target="_blank" class="btn variant-filled" href="http://localhost:{port}">interface</a>
			{/if}
		</div>
	</div>
</div>

<style>
	div.card > div.container {
		flex-grow: 1;
	}
</style>
