<script lang="ts">
	import XIcon from '$lib/icons/xIcon.svelte';
	import FileIcon from '$lib/icons/fileIcon.svelte';
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';
	import { getFilesStore } from '$lib/stores.svelte';
	import { getFormattedFileSize, calculateFutureDate } from '$lib/utils';
	import type { UploadFile } from '$lib/types';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button.svelte';
	import { toast } from 'svelte-sonner';

	let isUploading = $state(false);
	let selectedDowloads = $state(1);
	let selectedDate = $state('5m');

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
	}

	function getTotalFilesSize(files: File[]) {
		const totalSize = files.reduce((accumulator, current) => accumulator + current.size, 0);
		return getFormattedFileSize(totalSize);
	}

	function addMoreFiles(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const files = e.currentTarget.files;

		if (!files) {
			return;
		}
		filesStore.addFiles(files);
	}

	async function uploadFiles() {
		isUploading = true;

		const uploadFiles: UploadFile[] = [];

		try {
			for (const file of filesStore.files) {
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

			goto(`/${uploadId}/completed`);
		} catch (e: any) {
			toast.error(e.message);
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

<div class="mx-auto flex w-full max-w-2xl flex-col gap-6">
	<div class="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
		<div class="flex items-center justify-between border-b border-gray-100 pb-4">
			<h2 class="text-lg font-semibold text-gray-900">Selected Files</h2>
			<span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
				{filesStore.files.length} file{filesStore.files.length > 1 ? 's' : ''}
			</span>
		</div>

		<div class="custom-scrollbar flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-2">
			{#each filesStore.files as file}
				<div
					class="group relative flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-3 transition-all hover:border-blue-200 hover:bg-blue-50/30"
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
						onclick={() => removeFile(file)}
						class="flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
						aria-label="Remove file"
					>
						<XIcon class="size-5" />
					</button>
				</div>
			{/each}
		</div>

		<div class="flex items-center justify-between border-t border-gray-100 pt-4">
			<div class="flex items-center gap-4">
				<input onchange={addMoreFiles} id="add-more" type="file" class="hidden" multiple />
				<label
					for="add-more"
					class="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
				>
					<CirclePlusIcon class="size-5" />
					Add more files
				</label>
			</div>
			<p class="text-sm font-medium text-gray-600">
				Total: <span class="text-gray-900">{getTotalFilesSize(filesStore.files)}</span>
			</p>
		</div>
	</div>

	<div class="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
		<div class="flex flex-col gap-4">
			<h2 class="text-lg font-semibold text-gray-900">Transfer Options</h2>

			<div class="grid gap-6 sm:grid-cols-2">
				<div class="flex flex-col gap-2">
					<label class="text-sm font-medium text-gray-700">Expires after downloads</label>
					<div class="relative">
						<select
							bind:value={selectedDowloads}
							class="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
						>
							{#each expireOptions.byDownloads as dowloads}
								<option value={dowloads.value}>{dowloads.label}</option>
							{/each}
						</select>
						<div
							class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
						>
							<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<label class="text-sm font-medium text-gray-700">Expires after time</label>
					<div class="relative">
						<select
							bind:value={selectedDate}
							class="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
						>
							{#each expireOptions.byDate as date}
								<option value={date.value}>{date.label}</option>
							{/each}
						</select>
						<div
							class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
						>
							<svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Button
			onClick={uploadFiles}
			loading={isUploading}
			variant="solid"
			class="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-70"
		>
			{isUploading ? 'Uploading...' : 'Transfer Files'}
		</Button>
	</div>
</div>
