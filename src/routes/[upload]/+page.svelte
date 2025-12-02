<script lang="ts">
	import DownloadIcon from '$lib/icons/downloadIcon.svelte';
	import FileIcon from '$lib/icons/fileIcon.svelte';
	import type { SendFile } from '$lib/server/schema.js';
	import { getFormattedFileSize } from '$lib/utils.js';
	import { toast } from 'svelte-sonner';

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

<div class="mx-auto flex w-full max-w-2xl grow flex-col items-center justify-center p-4">
	<div class="flex w-full flex-col items-center gap-8 rounded-3xl p-8">
		<div class="flex size-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
			<DownloadIcon class="size-10" />
		</div>

		<div class="flex flex-col items-center gap-2 text-center">
			<h1 class="text-2xl font-bold text-gray-900">Ready to download</h1>
			<p class="text-gray-600">This file was shared securely and will expire automatically.</p>
		</div>

		<div class="flex flex-col gap-3">
			{#each data.files as file}
				<div
					class="group relative flex min-w-96 items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/30"
				>
					<div
						class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm"
					>
						<FileIcon class="size-6 text-blue-500" />
					</div>

					<div class="flex min-w-0 flex-1 flex-col gap-0.5">
						<h3 class="truncate font-medium text-gray-900">{file.name}</h3>
						<p class="text-xs text-gray-500">{getFormattedFileSize(file.size)}</p>
					</div>

					<button
						on:click={() => downloadFile(file)}
						class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm transition-all hover:bg-blue-600 hover:text-white hover:shadow-md"
						title="Download file"
					>
						<DownloadIcon class="size-5" />
					</button>
				</div>
			{/each}
		</div>

		<div class="flex flex-col gap-4 border-t border-gray-100 pt-6">
			<p class="text-center text-xs text-gray-400">
				By downloading, you agree to our Terms of Service and Privacy Policy.
			</p>
		</div>
	</div>
</div>
