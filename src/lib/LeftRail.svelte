<script>
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
</script>

<AppRail>
	<div class="p-2 flex flex-row justify-center">
		<LightSwitch />
	</div>
	<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>Instruments</AppRailAnchor>
	<AppRailAnchor href="/actions" selected={$page.url.pathname === '/actions'}>Actions</AppRailAnchor
	>
	<AppRailAnchor href="/table" selected={$page.url.pathname === '/table'}>Table</AppRailAnchor>
</AppRail>
