<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">mux</h2>
	<p>Immediately set state to initial_state, wait 2 sec, then set to desired_state</p>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>serial_port</dt>
				<dd>The port that the mux is attached to, e.g. COM30</dd>
				<dt>initial_state</dt>
				<dd>
					Mux immediately set to this. It's a sequence of 8 integer booleans. 0 means off and 1
					means on.
				</dd>
				<dt>desired_state</dt>
				<dd>
					Mux set to this after spending time in initial state. Also a sequence of 0 integer bools.
				</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
