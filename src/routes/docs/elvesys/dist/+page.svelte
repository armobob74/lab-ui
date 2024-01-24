<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">dist</h2>
	<p>
		Control the Distributor. Valve is set to some initial setting for a time, then shifted after a
		pause.
	</p>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>serial_port</dt>
				<dd>The port that the distributor is attached to, e.g. COM30</dd>
				<dt>initial_set_valve_id</dt>
				<dd>The ID of the valve that the distrbutor is initially set to.</dd>
				<dt>desired_set_valve_id</dt>
				<dd>After spending time in initial state, distributor is set to this.</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
