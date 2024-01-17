<script>
	import XLSX from 'xlsx';

	let filename = localStorage.getItem('filename') || 'default_filename.xlsx';
	const tables = JSON.parse(localStorage.getItem('tables') || '{}');

	function validate() {
		if (!filename.endsWith('.xlsx')) {
			filename = filename.split('.')[0] + '.xlsx';
		}
	}

	function save() {
		// Create a new workbook
		const workbook = XLSX.utils.book_new();

		// Iterate over each table in the tables object
		Object.keys(tables).forEach((tabName) => {
			const table = tables[tabName];
			const worksheet = XLSX.utils.json_to_sheet(table.data, { header: table.columns });
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
