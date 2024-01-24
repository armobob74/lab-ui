<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">ob1</h2>
	<p />
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>serial_port</dt>
				<dd />
				<dt>channel_to_initialize</dt>
				<dd />
				<dt>pressure_to_set</dt>
				<dd />
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
