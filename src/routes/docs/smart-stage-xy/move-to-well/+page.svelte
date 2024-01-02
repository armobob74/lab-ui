<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">move-to-well</h2>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>Instrument Name</dt>
				<dd>The name of the SmartStageXY instrument that will recieve the command</dd>
				<dt>Well</dt>
				<dd>The name of the well (A1, D3, etc) that the instrument will move to</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
