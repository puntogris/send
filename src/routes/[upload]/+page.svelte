<script lang="ts">
	import DownloadIcon from '$lib/icons/downloadIcon.svelte';
	import FileIcon from '$lib/icons/fileIcon.svelte';
	import type { SendFile } from '$lib/server/schema.js';
	import { getFormattedFileSize } from '$lib/utils.js';
	import { toast } from 'svelte-french-toast';

	export let data;

	async function downloadFile(file: SendFile) {
		const loadingToast = toast.loading('Dowloading file...');

		const response = await fetch('/api/download', {
			method: 'post',
			body: JSON.stringify({
				fileId: file.id,
				uploadId: file.upload
			})
		});

		toast.dismiss(loadingToast);

		if (!response.ok) {
			toast.error('An error ocurred!');
			return;
		}
		const { url } = await response.json();

		const link = document.createElement('a');
		link.href = url;
		link.download = file.name;
		link.click();

		toast.success('File downloaded!');
	}
</script>

<div class="mx-auto flex max-w-2xl grow flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-3xl font-bold">Download files</h1>
	<p class="text-center">
		This file was shared using send.puntogris with end-to-end encryption and a link that
		automatically expires.
	</p>
	<div class="flex w-full flex-col gap-2">
		{#each data.files as file}
			<div class="flex items-center justify-between rounded border p-2">
				<div class="flex w-full items-center gap-2">
					<div class="text-blue-500">
						<FileIcon size={32} />
					</div>
					<div class="flex flex-col">
						<h1>{file.name}</h1>
						<p class="text-xs text-gray-600">{getFormattedFileSize(file.size)}</p>
					</div>
				</div>
				<button
					on:click={() => downloadFile(file)}
					class="rounded p-1 text-gray-800 hover:bg-gray-100"
				>
					<DownloadIcon size={24} />
				</button>
			</div>
		{/each}
	</div>
</div>
