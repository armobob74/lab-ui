<script>
	export let id;
	import { tables_store } from '$lib/stores.js';
	let columns = ['name', 'number', 'quantity'];
	let data = [
		['0001', 'Apple', '22'],
		['0002', 'Carrot', '12'],
		['0003', 'Potato', '34']
	];
	export let options = {};
	let table;
	tables_store.subscribe((tables) => {
		table = tables[id];
		columns = table.columns;
		data = table.data;
	});

	function addRow() {
		tables_store.update((tables) => {
			tables = { ...tables };
			tables[id].data = [...data, [...newRow]];
			return tables;
		});
	}
	function deleteRow(rowToBeDeleted) {
		data = data.filter((row) => row != rowToBeDeleted);
	}
	let newRow = Array(columns.length);
</script>

<table class="table" {id}>
	<thead>
		<tr>
			{#each columns as column}
				<th>{column}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr>
				{#each row as cell, idx}
					{#if columns[idx] in options}
						<td
							><select>
								{#each options[columns[idx]] as option}
									<option>{option}</option>
								{/each}
							</select></td
						>
					{:else}
						<td contenteditable="true" bind:innerHTML={cell} />
					{/if}
				{/each}
				<button class="btn variant-filled" on:click={() => deleteRow(row)}>X</button>
			</tr>
		{/each}
	</tbody>
</table>
<div class="flex justify-center m-4">
	<button class="btn variant-filled" on:click={addRow}>Add Row</button>
</div>

<style>
	select {
		background: none;
		width: 100%;
		height: 100%;
	}
</style>
