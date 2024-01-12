<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">transfer</h2>
	<p>Draw vol mL from from_port and dispense to to_port</p>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>from_port</dt>
				<dd>the port to aspirate from</dd>
				<dt>to_port</dt>
				<dd>the port to dispense to</dd>
				<dt>vol</dt>
				<dd>volume to aspirate/dispense in mL</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
