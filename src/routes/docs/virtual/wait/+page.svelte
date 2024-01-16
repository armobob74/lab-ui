<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">wait</h2>
	<p>Wait for some number of seconds. Can be an integer or a float.</p>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl>
				<dt>seconds</dt>
				<dd>seconds to wait</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
