<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<!-- for documentation check out https://www.skeleton.dev/components/app-shell-->
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<div class="p-2 flex flex-row justify-center">
				<LightSwitch />
			</div>
			<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>Instruments</AppRailAnchor>
			<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}>Init</AppRailAnchor>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
