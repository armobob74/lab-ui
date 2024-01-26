<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">ob1</h2>
	<p />
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>device_name</dt>
				<dd>The name of the Elvesys device that we wish to control</dd>
				<dt>channel_to_initialize</dt>
				<dd />
				<dt>pressure_to_set</dt>
				<dd />
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
