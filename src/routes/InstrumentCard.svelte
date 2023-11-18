<script>
	export let name; // string
	export let type; // string
	export let port; // string but should parse to an int
	let iconFromType = {
		SPM: '[ SPM ]',
		SmartStageXY: '[ SmartStageXY ]'
	};
	function deleteCard() {
		alert("haven't implimented this yet. Gotta figure out svelte stores for the instrument list.");
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
