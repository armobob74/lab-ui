<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">double press</h2>
	<p>
		Press button, wait delay sec, and press button again. Because of cloud/tuya lag, total waiting
		time may be longer than delay.
	</p>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>delay</dt>
				<dd>time to wait in seconds</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
