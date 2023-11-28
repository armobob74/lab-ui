<script>
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { read, utils, writeFileXLSX } from 'xlsx';
	let files; //FileList
	let file;

	let checking_extension = false;
	let extension_correct = false;
	let tabcheck = false;
	let tabs_correct = new Promise(() => {});

	async function fileUploadHandler() {
		file = files[0];
		checkFileExtension();
		tabs_correct = await checkFileTabs();
	}

	function checkFileExtension() {
		checking_extension = true;
		if (!file.name.endsWith('.xlsx')) {
			extension_correct = false;
			return;
		}

		extension_correct = true;
		return;
	}
	let missing_tabs = [];
	async function checkFileTabs() {
		// Convert File object to ArrayBuffer
		const arrayBuffer = await file.arrayBuffer();
		const workbook = read(arrayBuffer);

		const requiredTabs = ['Protocol', 'SourceDest', 'Steps'];
		const fileTabs = workbook.SheetNames;

		let hasRequiredTabs = true;
		requiredTabs.forEach((tab) => {
			if (!fileTabs.includes(tab)) {
				missing_tabs = [...missing_tabs, tab];
				hasRequiredTabs = false;
			}
		});

		if (hasRequiredTabs) {
			return true;
		} else {
			return false;
		}
	}
</script>

<div class="p-4 flex flex-col justify-center">
	<h2 class="h2">File Upload</h2>
	<p>File must be a .xlsx with three case-sensitive tabs: Protocol, SourceDest, Steps</p>
	<p>Uploading a file will overwrite the current state of the tables on the app</p>
	<div class="mt-4">
		<FileDropzone name="xlsx" bind:files on:change={fileUploadHandler}
			><p slot="message"><strong>Upload a file</strong> or drag and drop</p></FileDropzone
		>
	</div>
	{#if checking_extension}
		{#if extension_correct}
			<p class="dark:text-success-500 text-success-800">.xlsx extension confirmed -- nice job!</p>
		{:else}
			<p class="text-error-500">Please upload a .xlsx file</p>
		{/if}
	{/if}
	{#await tabs_correct then}
		<div>
			{#if tabs_correct}
				<p class="dark:text-success-500 text-success-800">All required tabs are present.</p>
			{:else}
				<p class="text-error-500">Missing the following tabs: {missing_tabs}</p>
			{/if}
		</div>
	{/await}
</div>
