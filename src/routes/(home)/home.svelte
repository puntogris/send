<script lang="ts">
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';
	import { getFilesStore } from '$lib/stores.svelte';
	import { twMerge } from 'tailwind-merge';

	const filesStore = getFilesStore();
	let isDragging = $state(false);

	function handleFiles(fileList: FileList) {
		filesStore.addFiles(fileList);
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
		'relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-dashed bg-gray-50/30 p-12 transition-all duration-300 ease-out',
		isDragging
			? 'scale-[1.01] border-blue-400 bg-blue-50/30'
			: 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50'
	)}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
	role="region"
>
	<div class="flex flex-col items-center gap-8 text-center">
		<div class="relative">
			<div
				class="absolute -inset-4 animate-pulse rounded-full bg-blue-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				class:opacity-100={isDragging}
			></div>
			<CirclePlusIcon
				class={twMerge(
					'relative size-16 text-gray-300 transition-colors duration-300',
					isDragging ? 'text-blue-500' : 'group-hover:text-blue-400'
				)}
			/>
		</div>

		<div class="flex flex-col items-center gap-2">
			<h3 class="text-xl font-medium text-gray-900">Drag and drop files</h3>
			<p class="text-base text-gray-500">
				or click to send up to <span class="font-medium text-gray-700">1GB</span>
			</p>
		</div>

		<div class="flex flex-col items-center gap-2 pt-2">
			<label
				for="upload"
				class="group relative cursor-pointer overflow-hidden rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
			>
				<span class="relative z-10">Select files</span>
			</label>
			<input
				onchange={(e) => {
					if (e.currentTarget.files) handleFiles(e.currentTarget.files);
				}}
				id="upload"
				type="file"
				class="hidden"
				multiple
			/>
		</div>
	</div>
</div>
