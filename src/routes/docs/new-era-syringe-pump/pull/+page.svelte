<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">pull</h2>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>Address</dt>
				<dd>The address of the pump that will execute this command</dd>
				<dt>Volume</dt>
				<dd>Volume to pull in mL</dd>
				<dt>Rate</dt>
				<dd>The flow rate in mL/min</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
