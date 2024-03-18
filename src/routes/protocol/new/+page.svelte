<script>
	import { tables_store } from '$lib/stores.js';
	let column_string = 'Instrument Name, Step, Args';
	let columns;
	let tabname = '';
	$: {
		columns = column_string.split(',').map((column) => column.trim());
	}
	function validateInputs() {
		if (!tabname) {
			alert("Error: table name can't be empty");
			return false;
		}
		console.log(tabname);
		if (localStorage.getItem(tables)) {
			let current_names = Object.keys(JSON.parse(localStorage.getItem('tables')));
		} else {
			let current_names = [];
		}
		if (current_names.includes(tabname)) {
			alert('Error: table name must be unique');
			return false;
		}
		return true;
	}
	function newTable() {
		if (!validateInputs()) {
			return;
		}
		tables_store.update((tables) => {
			tables[tabname] = {
				columns: columns,
				data: []
			};
			return tables;
		});
		localStorage.setItem('active-protocol', tabname);
		document.location.href = '/protocol';
	}
</script>

<div class="p-4">
	<form>
		<label for="tabname">Name</label>
		<input class="input p-4 mb-2" type="text" name="tabname" id="tabname" bind:value={tabname} />
		<label for="columns">Column titles (comma-separated list)</label>
		<input
			class="input p-4 mb-2"
			type="text"
			name="columns"
			id="columns"
			bind:value={column_string}
		/>
		<button class="btn variant-filled" type="button" on:click={newTable}>Create Table</button>
	</form>
</div>
