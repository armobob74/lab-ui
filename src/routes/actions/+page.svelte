<script>
	import { actions_store } from '$lib/stores';

	let actions = [];
	actions_store.subscribe((current_actions) => {
		actions = current_actions;
	});
	function save() {
		let act_str = document.querySelector('textarea').value;
		try {
			const parsedActions = JSON.parse(act_str);
			actions_store.set(parsedActions);
		} catch (e) {
			alert('Incorrect JSON format');
		}
	}
</script>

<h2 class="h2">Actions</h2>
<p>
	Actions are special operations that you can trigger at any time. Each action makes API calls and
	then logs the response.
</p>
<textarea class="textarea">{JSON.stringify(actions, 0, 4)}</textarea>
<button type="button" class="btn variant-filled-primary" on:click={save}>Save</button>

<style>
	textarea {
		height: 50vh;
	}
</style>
