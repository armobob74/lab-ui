<script>
	import { FileDropzone } from '@skeletonlabs/skeleton';
	let files; //FileList
	let file;

	let checking_extension = false;
	let extension_correct = false;
	let checking_tabs = false;

	function fileUploadHandler() {
		file = files[0];
		checkFileExtension();
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
</script>

<div class="p-4 flex flex-col justify-center">
	<h2 class="h2">File Upload</h2>
	<p>File must be a .xlsx with three tabs: Protocol, SourceDest, Steps</p>
	<p>Uploading a file will overwrite the current state of the tables on the app</p>
	<div class="mt-4">
		<FileDropzone name="xlsx" bind:files on:change={fileUploadHandler}
			><p slot="message"><strong>Upload a file</strong> or drag and drop</p></FileDropzone
		>
	</div>
	{#if checking_extension}
		<h4 class="h4">Confirming file exstension...</h4>
		{#if extension_correct}
			<p class="dark:text-success-500 text-success-800">.xlsx extension confirmed -- nice job!</p>
		{:else}
			<p class="text-error-500">Please upload a .xlsx file</p>
		{/if}
	{/if}
</div>
