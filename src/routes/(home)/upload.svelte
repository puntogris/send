<script lang="ts">
	import XIcon from '$lib/icons/xIcon.svelte';
	import FileIcon from '$lib/icons/fileIcon.svelte';
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';
	import { getFilesStore } from '$lib/stores';
	import { getFormattedFileSize, calculateFutureDate } from '$lib/utils';
	import toast from 'svelte-french-toast';
	import type { UploadFile } from '$lib/types';
	import { goto } from '$app/navigation';

	let isUploading = false;
	let selectedDowloads = 1;
	let selectedDate = '5m';

	const expireOptions = {
		byDownloads: [
			{ value: 1, label: '1 download' },
			{ value: 2, label: '2 downloads' },
			{ value: 3, label: '3 downloads' },
			{ value: 4, label: '4 downloads' },
			{ value: 5, label: '5 downloads' },
			{ value: 20, label: '20 downloads' },
			{ value: 50, label: '50 downloads' },
			{ value: 100, label: '100 downloads' }
		],
		byDate: [
			{ value: '5m', label: '5 minutes' },
			{ value: '1h', label: '1 hour' },
			{ value: '1d', label: '1 day' },
			{ value: '7d', label: '7 days' }
		]
	};

	const filesStore = getFilesStore();

	function removeFile(file: File) {
		filesStore.remove(file);
		toast.success('File removed!');
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
		filesStore.addFiles(files);
		toast.success('Files added!');
	}

	async function uploadFiles() {
		isUploading = true;

		const files = [...$filesStore];
		const uploadFiles: UploadFile[] = [];

		const uploadToast = toast.loading('Uploading files, please wait.');

		try {
			for (const file of files) {
				const { url, id } = await getUploadSignedUrl();
				const upload = {
					id,
					name: file.name,
					size: file.size,
					url,
					file
				};
				uploadFiles.push(upload);
				await uploadFileToS3(upload);
			}
			const { uploadId } = await completeUpload(uploadFiles);

			toast.success('Files uploaded!', { id: uploadToast });

			goto(`/${uploadId}/completed`);
		} catch (e: any) {
			console.error(e);
			toast.error(e.message, { id: uploadToast });
		} finally {
			isUploading = false;
		}
	}

	async function getUploadSignedUrl(): Promise<{ url: string; id: string }> {
		const response = await fetch('/api/upload/s3', {
			method: 'post'
		});

		if (!response.ok) {
			throw new Error('Error getting upload URL.');
		}
		const { url, id } = await response.json();
		return { url, id };
	}

	async function uploadFileToS3(upload: UploadFile) {
		const response = await fetch(upload.url, {
			method: 'put',
			body: upload.file
		});

		if (!response.ok) {
			throw new Error('Error uploading file.');
		}
	}

	async function completeUpload(files: UploadFile[]): Promise<{ uploadId: string }> {
		const response = await fetch('api/upload/complete', {
			method: 'post',
			body: JSON.stringify({
				uploadFiles: files,
				expireAt: calculateFutureDate(selectedDate),
				expireDownloads: selectedDowloads
			})
		});

		if (!response.ok) {
			throw new Error('Error completing upload.');
		}
		const { upload } = await response.json();
		return { uploadId: upload };
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
				<button on:click={() => removeFile(file)} class="rounded p-1 hover:bg-gray-100">
					<XIcon size={20} />
				</button>
			</div>
		{/each}
		<div class="flex items-center justify-between pt-4">
			<input on:change={addMoreFiles} id="upload" type="file" class="hidden" multiple />
			<label
				for="upload"
				class="flex items-center gap-2 rounded px-1 py-2 text-sm hover:bg-gray-200 hover:bg-opacity-75"
			>
				<div class="text-blue-600">
					<CirclePlusIcon size={30} />
				</div>
				Select files to upload
			</label>
			<h4 class="text-right text-sm text-gray-600">
				Total size: {getTotalFilesSize($filesStore)}
			</h4>
		</div>
	</div>
	<div class="flex items-center gap-2">
		Expires after
		<select
			bind:value={selectedDowloads}
			class="rounded bg-gray-100 p-2 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
		>
			{#each expireOptions.byDownloads as dowloads}
				<option value={dowloads.value}>{dowloads.label}</option>
			{/each}
		</select>
		or
		<select
			bind:value={selectedDate}
			class="rounded bg-gray-100 p-2 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
		>
			{#each expireOptions.byDate as date}
				<option value={date.value}>{date.label}</option>
			{/each}
		</select>
	</div>
	<button
		disabled={isUploading}
		on:click={uploadFiles}
		class="mt-auto rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700">Upload</button
	>
</div>
