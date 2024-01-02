<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">transfer</h2>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl>
				<dt>Instrument Name</dt>
				<dd>The name of the SPM Syringe Pump that will perform the transfer</dd>
				<dt>from-port</dt>
				<dd>The port that the syringe will pull from</dd>
				<dt>to-port</dt>
				<dd>The port that the syringe dispense to</dd>
				<dt>volume</dt>
				<dd>The volume to dispense (mL)</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
