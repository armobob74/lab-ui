<script>
	import { onDestroy, onMount } from 'svelte';

	export let statusPath = '';
	export let port = '5000';
	let status_url = `http://localhost:${port}` + statusPath;
	console.log('setting url', status_url);
	let status = 'status unknown';
	let status_interval;

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
		}, 500);
	});
	onDestroy(() => {
		clearInterval(status_interval);
	});
</script>

<p>{status}</p>
