<script>
	import { onDestroy, onMount } from 'svelte';

	export let statusPath = '';
	export let port = '5000';
	export let ip = '127.0.0.1';
	let status_url = `http://${ip}:${port}` + statusPath;
	console.log('setting status url: ', status_url);
	let status = 'status unknown';
	let status_interval;
	const status_interval_ms = 3000;

	async function getStatus() {
		const response = await fetch(status_url);
		const json = await response.json();
		if (response.ok) {
			status = json['status'];
		} else {
			status = 'Error getting status';
		}
	}

	onMount(() => {
		getStatus();
		status_interval = setInterval(() => {
			getStatus(port);
		}, status_interval_ms);
	});
	onDestroy(() => {
		clearInterval(status_interval);
	});
</script>

<p>{status}</p>
