<script lang="ts">
	import XIcon from '$lib/icons/xIcon.svelte';
	import FileIcon from '$lib/icons/fileIcon.svelte';
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';
	import { getFilesStore } from '$lib/stores';
	import { getFormattedFileSize } from '$lib/utils';
	import toast from 'svelte-french-toast';

	const filesStore = getFilesStore();

	function removeFile(file: File) {
		filesStore.remove(file);
	}

	function getTotalFilesSize(files: FileList) {
		const totalSize = Array.from(files).reduce((accumulator, current) => {
			return accumulator + current.size;
		}, 0);

		return getFormattedFileSize(totalSize);
	}

	function addMoreFiles(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const files = e.currentTarget.files;

		if (!files) {
			return;
		}

		const dt = new DataTransfer();

		const uniqueFiles = [...files, ...$filesStore].reduce((accumulator, file) => {
			if (!accumulator.some((existingFile) => existingFile.name === file.name)) {
				accumulator.push(file);
			}
			return accumulator;
		}, [] as File[]);

		uniqueFiles.forEach((f) => dt.items.add(f));

		filesStore.set(dt.files);

		toast.success('Files added!');
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2 rounded bg-gray-100 p-4">
		{#each $filesStore as file}
			<div class="flex items-center justify-between rounded bg-white p-2 shadow-sm">
				<div class="flex items-center gap-2">
					<div class="text-blue-500">
						<FileIcon size={40} />
					</div>
					<div class="flex flex-col">
						<h1>{file.name}</h1>
						<p class="text-xs text-gray-600">{getFormattedFileSize(file.size)}</p>
					</div>
				</div>
				<button on:click={() => removeFile(file)}>
					<XIcon size={20} />
				</button>
			</div>
		{/each}
		<div class="flex items-center justify-between pt-4">
			<input on:change={addMoreFiles} id="upload" type="file" class="hidden" multiple />
			<label for="upload" class="flex items-center gap-2 rounded hover:opacity-70">
				<div class="text-blue-600">
					<CirclePlusIcon size={30} />
				</div>
				Select files to upload
			</label>
			<h4 class="text-sm text-gray-600">Total size: {getTotalFilesSize($filesStore)}</h4>
		</div>
	</div>
	<button class="mt-auto rounded-lg bg-blue-600 p-3 text-white">Upload</button>
</div>
