<script>
	export let action_title = 'Delay 3';
	export let action_url = 'https://httpbin.org/delay/6';
	export let request_method = 'POST';
	export let request_args = [];
	export let responseHandler = async (response) => {
		console.log(response);
	};

	let in_process = false;
	async function clickHandler() {
		const button = document.querySelector('button');
		in_process = true;
		const response = await fetch(action_url, {
			method: request_method,
			body: JSON.stringify({ args: request_args }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		await responseHandler(response);
		in_process = false;
	}
</script>

<button
	on:click={clickHandler}
	class="{in_process ? 'gradient-animate' : ''} hover:bg-secondary-500"
>
	{action_title}
</button>

<style lang="scss">
	button {
		width: 100%;
		padding-top: 1em;
		padding-bottom: 1em;
	}
	.gradient-animate {
		background: linear-gradient(60deg, #1f1f60, #22ff05, #1f1f60);
		background-size: 400% 400%;
		animation: gradientBG 2s linear infinite;
	}

	@keyframes gradientBG {
		0% {
			background-position: 0%;
		}
		50% {
			background-position: 100%;
		}
		100% {
			background-position: 0%;
		}
	}
</style>
