<script>
	export let port;
	export let ip;
	let connected = false;
	let interval_milisecs = 3000;
	let interval;
	import { onDestroy, onMount } from 'svelte';
	onMount(() => {
		async function checkConnection(port) {
			let target = `http://${ip}:${port}`;
			try {
				let response = await fetch(target);
				connected = response.ok;
			} catch (error) {
				connected = false;
			}
		}
		checkConnection(port);
		interval = setInterval(() => {
			checkConnection(port);
		}, interval_milisecs);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<slot />
{#if connected}
	<span class="text-primary-500">connected</span>
{:else}
	<span class="text-error-500">disconnected</span>
{/if}
