<script>
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import LeftRail from '../lib/LeftRail.svelte';
	import RightRail from '../lib/RightRail.svelte';
</script>

<!-- for documentation check out https://www.skeleton.dev/components/app-shell-->
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft"><LeftRail /></svelte:fragment>
	<svelte:fragment slot="sidebarRight"><RightRail /></svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
