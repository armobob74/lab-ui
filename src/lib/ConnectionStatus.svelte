<script>
	export let port;
	let connected = false;
	import { onMount } from 'svelte';
	onMount(() => {
		async function checkConnection(port) {
			let target = `http://localhost:${port}`;
			try {
				let response = await fetch(target);
				connected = response.ok;
			} catch (error) {
				connected = false;
			}
		}
		checkConnection(port);
		setInterval(() => {
			checkConnection(port);
		}, 3000);
	});
</script>

<slot />
{#if connected}
	<span class="text-primary-500">connected</span>
{:else}
	<span class="text-error-500">disconnected</span>
{/if}
