<script lang="ts">
	import XIcon from '$lib/icons/xIcon.svelte';
	import FileIcon from '$lib/icons/fileIcon.svelte';
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';

	let files = ['file1', 'file2', 'file3'];
</script>

<div class="flex flex-col">
	<div class="flex flex-col gap-2 rounded bg-gray-100 p-4">
		{#each files as file}
			<div class="flex items-center justify-between rounded bg-white p-2 shadow-sm">
				<div class="flex items-center gap-2">
					<div class="text-blue-500">
						<FileIcon size={40} />
					</div>
					<div class="flex flex-col">
						<h1>{file}</h1>
						<p class="text-xs text-gray-600">1.5MB</p>
					</div>
				</div>
				<XIcon size={20} />
			</div>
		{/each}
		<div class="flex items-center justify-between pt-4">
			<button class="flex items-center gap-2">
				<div class="text-blue-600">
					<CirclePlusIcon size={30} />
				</div>
				Select files to upload
			</button>
			<h4 class="text-sm text-gray-600">Total size: 15MB</h4>
		</div>
	</div>
	<button class="mt-auto rounded-lg bg-blue-600 p-3 text-white">Upload</button>
</div>
