<script>
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import LeftRail from '../lib/LeftRail.svelte';
</script>

<!-- for documentation check out https://www.skeleton.dev/components/app-shell-->
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft"><LeftRail /></svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
