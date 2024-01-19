<script lang="ts">
	import ClipboardIcon from '$lib/icons/clipboardIcon.svelte';
	import toast from 'svelte-french-toast';

	export let data;

	function copyUrl() {
		toast.success('Copied to clipboard!');
	}

	function getFormattedDate(date: Date) {
		return date.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'short'
		});
	}
</script>

<article class="flex w-full flex-col gap-4 p-6">
	<h1 class="mb-6 text-3xl font-bold">My uploads</h1>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each data.upload as upload}
			<div
				class="overflow-hidden rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 shadow-lg"
			>
				<div class="p-6">
					<h3 class="mb-1 font-semibold">Files:</h3>
					<p class="mb-4 whitespace-normal">{upload.fileNames.replaceAll('/!@#/', ', ')}</p>

					<h3 class="mb-1 font-semibold">Created at:</h3>
					<p class="mb-4">{getFormattedDate(upload.createdAt)}</p>

					<h3 class="mb-1 font-semibold">Expires:</h3>
					<p>
						{getFormattedDate(upload.expireAt)} or {upload.expireDownloads} downloads
					</p>
				</div>
				<button
					on:click={copyUrl}
					class="flex h-12 w-full items-center justify-center rounded-b bg-white bg-opacity-50 hover:bg-opacity-70"
				>
					<ClipboardIcon /> Copy to clipboard
				</button>
			</div>
		{/each}
	</div>
</article>
