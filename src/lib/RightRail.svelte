<script>
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import ActionButton from '$lib/ActionButton.svelte';
</script>

<AppRail class="text-center">
	<h1>Actions</h1>
	<div class="p-2 flex flex-row justify-center">
		<LightSwitch />
	</div>
	<ActionButton />
</AppRail>
