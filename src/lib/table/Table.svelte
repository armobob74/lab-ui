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
	export let filtered_options = {};
	let table;

	$: if (id) {
		console.log('loading table', id);
		tables_store.subscribe((tables) => {
			table = tables[id];
			columns = table.columns;
			data = table.data;
		});
	}

	function addRow() {
		tables_store.update((tables) => {
			tables[id].data = [...data, [...newRow]];
			return tables;
		});
	}
	function deleteRow(rowToBeDeleted) {
		data = data.filter((row) => row != rowToBeDeleted);
		tables_store.update((tables) => {
			tables[id].data = data;
			return tables;
		});
	}
	function updateTable(table) {
		//sync the store with the data variable
		//used when cell is changed
		tables_store.update((tables) => {
			let new_data = [];
			data.forEach((row) => {
				let new_row = [];
				row.forEach((cell) => {
					new_row.push(cell.trim());
				});
				new_data.push(new_row);
			});
			tables[id].data = new_data;
			return tables;
		});
	}
	let newRow = Array(columns.length);
</script>

<table class="table" {id}>
	<thead>
		<tr>
			{#each columns as column}
				<th>{column}</th>
			{/each}
			<th />
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr>
				{#each row as cell, idx}
					{#if columns[idx] in options}
						<td
							><select class="select" bind:value={cell} on:blur={() => updateTable(id)}>
								{#each options[columns[idx]] as option}
									<option>{option}</option>
								{/each}
							</select></td
						>
					{:else if columns[idx] in filtered_options}
						{@const [row_input, optionsFunction] = filtered_options[columns[idx]]}
						{@const options = optionsFunction(row[row_input])}
						<td>
							<select class="select" bind:value={cell} on:blur={() => updateTable(id)}>
								{#each options as option, idx}
									<option>{option}</option>
								{/each}
							</select>
						</td>
					{:else}
						<td contenteditable="true" bind:innerText={cell} on:blur={() => updateTable(id)} />
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
