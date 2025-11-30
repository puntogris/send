<script lang="ts">
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';
	import { getFilesStore } from '$lib/stores';
	import { twMerge } from 'tailwind-merge';

	const filesStore = getFilesStore();
	let isDragging: boolean = false;

	function handleFiles(fileList: FileList) {
		if (fileList) {
			filesStore.addFiles(fileList);
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;

		if (event.dataTransfer && event.dataTransfer.files) {
			handleFiles(event.dataTransfer.files);
		}
	}
</script>

<div
	class={twMerge(
		'flex h-full flex-col justify-center rounded-md border-4 border-dashed p-4',
		isDragging ? 'border-gray-400' : 'border-gray-300'
	)}
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
	role="region"
>
	<div class="flex flex-col items-center gap-8">
		<CirclePlusIcon class="size-14 text-blue-600" />
		<div class=" flex flex-col items-center gap-1">
			<h3 class="text-lg font-semibold">Drag and drop files</h3>
			<h2>or click to send up to 1GB</h2>
		</div>
		<div class="flex flex-col items-center gap-2">
			<label
				for="upload"
				class="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				Select files to upload
			</label>
			<input bind:files={$filesStore} id="upload" type="file" class="hidden" multiple />
		</div>
	</div>
</div>
