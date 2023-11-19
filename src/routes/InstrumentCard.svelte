<script>
	export let name; // string
	export let type; // string
	export let port; // string but should parse to an int
	import { instruments_store } from '$lib/stores.js';
	let instruments = [];
	instruments_store.subscribe((value) => {
		instruments = value;
		console.log(instruments);
	});
	let iconFromType = {
		SPM: '[ SPM ]',
		SmartStageXY: '[ SmartStageXY ]'
	};
	function deleteCard() {
		let i = 0;
		while (instruments[i].port != port && i < instruments.length) {
			i++;
		}
		if (instruments[i].port == i) {
			//todo: deletion code here
			alert('still gotta finish this');
		} else {
			alert('Error: can not delete because instrument does not exist');
		}
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
			<p>port {port}</p>
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
