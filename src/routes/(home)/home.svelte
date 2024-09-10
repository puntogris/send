<script lang="ts">
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';
	import { getFilesStore } from '$lib/stores';

	const filesStore = getFilesStore();
</script>

<div
	class="flex h-full flex-col justify-center rounded-md border-4 border-dashed border-gray-300 p-4"
>
	<div class="flex flex-col items-center gap-8">
		<div class="text-blue-600">
			<CirclePlusIcon size={60} />
		</div>
		<div class="flex flex-col items-center gap-1">
			<h3 class="text-lg font-semibold">Drag and drop files</h3>
			<h2>or click to send up to 1GB</h2>
		</div>
		<div class="flex flex-col items-center gap-2">
			<label
				for="upload"
				class="cursor-pointer rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
				>Select files to upload</label
			>
			<input bind:files={$filesStore} id="upload" type="file" class="hidden" multiple />
		</div>
	</div>
</div>
