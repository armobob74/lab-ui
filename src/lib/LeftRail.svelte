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
	<AppRailAnchor href="/upload-xlsx" selected={$page.url.pathname === '/upload-xlsx'}
		>Upload .xlsx</AppRailAnchor
	>
	<AppRailAnchor href="/protocol" selected={$page.url.pathname === '/protocol'}
		>Protocol</AppRailAnchor
	>
	<AppRailAnchor href="/docs" selected={$page.url.pathname === '/docs'}>Docs</AppRailAnchor>
	<AppRailAnchor href="/run-protocol" selected={$page.url.pathname === '/run-protocol'}
		>Run Protocol</AppRailAnchor
	>
	<AppRailAnchor href="/run-complex" selected={$page.url.pathname === '/run-complex'}
		>Run Complex</AppRailAnchor
	>
</AppRail>
