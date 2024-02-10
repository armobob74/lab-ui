<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">switch-to-port</h2>
	immediately switch to the specified port
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>port_number</dt>
				<dd>the number of the port to switch to</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
