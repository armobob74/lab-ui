<script lang="js">
	import { tables_store } from '$lib/stores.js';
	export let table_id;
	// only include table-ids that match this condition
	export let includeCondition = (option) => true;
	let options = ['protocol', 'etc'];
	tables_store.subscribe((tables) => {
		options = Object.keys(tables);
		options = options.filter(includeCondition);
	});
</script>

<label for="table-id-select">Table ID:</label>
<select class="select" name="table-id-select" id="table-id-select" bind:value={table_id}>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
