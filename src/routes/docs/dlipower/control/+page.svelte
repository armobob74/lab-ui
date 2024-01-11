<script>
	import ArgsDoc from '$lib/ArgsDoc.svelte';
</script>

<div class="m-4">
	<h2 class="h2 font-mono">control</h2>
	<ArgsDoc>
		<svelte:fragment slot="dl">
			<dl class="custom-dl">
				<dt>button_name</dt>
				<dd>
					The custom name of the outlet to be toggled. Look in the switch's config file for more
					info, or open up the switch's interface.
				</dd>
				<dt>action</dt>
				<dd>"on" or "off"</dd>
			</dl>
		</svelte:fragment>
	</ArgsDoc>
</div>
