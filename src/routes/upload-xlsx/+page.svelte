<script>
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { read, utils, writeFileXLSX } from 'xlsx';
	import { tables_store } from '$lib/stores.js';
	let files; //FileList
	let file;

	let classListSuccess = 'dark:text-success-500 text-success-800';
	let classListError = 'text-error-500';
	let extension_correct = false;
	let messages = [];

	async function fileUploadHandler() {
		file = files[0];
		checkFileExtension();
		await readTables();
	}

	function checkFileExtension() {
		if (!file.name.endsWith('.xlsx')) {
			extension_correct = false;
			return;
		}
		extension_correct = true;
		let new_message = {
			classList: extension_correct ? classListSuccess : classListError,
			text: extension_correct
				? '.xlsx extension confirmed, nice job!'
				: 'please upload a .xlsx file'
		};
		messages = [...messages, new_message];
		return;
	}

	async function readTables() {
		clearTables();
		const arrayBuffer = await file.arrayBuffer();
		// used for saving later
		localStorage.setItem('filename', file.name);
		const workbook = read(arrayBuffer);
		workbook.SheetNames.forEach((tab) => {
			const worksheet = workbook.Sheets[tab];
			const jsonData = utils.sheet_to_json(worksheet, { header: 1, blankrows: true });
			let columns;
			let data;
			if (tab === 'main') {
				columns = [];
				data = jsonData;
			} else {
				columns = jsonData[0];
				data = jsonData.slice(1);
			}
			data.forEach((row) => {
				while (row.length < columns.length) {
					row.push(''); // Add a zero to the end of the row
				}
			});
			let table_id = tab;
			updateTable(table_id, columns, data);
		});
	}

	function updateTable(table_id, columns, data) {
		tables_store.update((tables) => {
			tables[table_id] = {
				columns: columns,
				data: data
			};
			return tables;
		});
		messages = [...messages, { text: `Updated table: ${table_id}`, classList: classListSuccess }];
	}

	function clearTables() {
		// clear all tables from tables_store
		tables_store.update(() => {
			return {};
		});
		localStorage.removeItem('active-protocol');
		messages = [...messages, { text: `Cleared tables`, classList: classListSuccess }];
	}
</script>

<div class="p-4 flex flex-col justify-center">
	<h2 class="h2">File Upload</h2>
	<ul>
		<li>File type must be .xlsx</li>
		<li>
			Formated like the <a class="a text-blue-500" href="/docs/examples/protocol-table"
				>example here</a
			>
		</li>
		<li>Uploading a file will overwrite the current state of the tables on the app</li>
	</ul>

	<div class="mt-4">
		<FileDropzone name="xlsx" bind:files on:change={fileUploadHandler}
			><p slot="message"><strong>Upload a file</strong> or drag and drop</p></FileDropzone
		>
	</div>
	{#each messages as message}
		<p class={message.classList}>{message.text}</p>
	{/each}
</div>
