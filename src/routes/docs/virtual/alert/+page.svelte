<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">alert</h2>
	<p>Gives the operator a decision to make</p>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl>
				<dt>yes_action</dt>
				<dd>first option to do</dd>
				<dt>no_action</dt>
				<dd>second option to do</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
