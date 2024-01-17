<script>
	import XLSX from 'xlsx';

	let filename = localStorage.getItem('filename') || 'default_filename.xlsx';
	const tables = JSON.parse(localStorage.getItem('tables') || '{}');

	function validate() {
		if (!filename.endsWith('.xlsx')) {
			filename = filename.split('.')[0] + '.xlsx';
		}
	}

	//function convertFormat(table) {
	//	// table format is currently: {
	//	//    columns:['A','B','C'],
	//	//    data:[[1,2,3],[,4,5,6],...]
	//	//}
	//	// this function converts it to a format that can be saved
	//}

	function convertFormat(table) {
		// Extract columns and data from the table
		const { columns, data } = table;

		// Map each row array in data to an object
		// where the keys are column names
		return data.map((row) => {
			let rowObject = {};
			columns.forEach((col, index) => {
				// Use the column name as key
				// If the row array is shorter than columns array, use undefined as value
				rowObject[col] = row.length > index ? row[index] : undefined;
			});
			return rowObject;
		});
	}

	function save() {
		// Create a new workbook
		const workbook = XLSX.utils.book_new();

		// Iterate over each table in the tables object
		Object.keys(tables).forEach((tabName) => {
			const table = tables[tabName];
			const reformattedTable = convertFormat(table);
			console.log(reformattedTable);
			const worksheet = XLSX.utils.json_to_sheet(reformattedTable);
			XLSX.utils.book_append_sheet(workbook, worksheet, tabName);
		});

		// Export the workbook
		XLSX.writeFile(workbook, filename);
	}
</script>

<div class="p-4 flex flex-col justify-center">
	<h2 class="h2">Download</h2>
	<p>Save a .xlsx file onto the computer. Saves to the default downloads path.</p>
	<label for="filename">Filename:</label>
	<input
		on:change={validate}
		class="input p-4 mb-2"
		type="text"
		name="filename"
		id="filename"
		bind:value={filename}
	/>
	<button type="button" class="btn variant-filled w-64" on:click={save}>Download</button>
</div>
