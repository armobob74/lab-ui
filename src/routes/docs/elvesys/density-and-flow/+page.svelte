<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">Density and Flow</h2>
	<p>
		Read the density and flow info from the flowmeter. This is a GET endpoint so it can not be run
		from the runner right now.
	</p>

	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>device_name</dt>
				<dd>The name of the Elvesys device that we wish to control</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
