<script lang="ts">
	import { getFilesStore } from '$lib/stores.svelte';
	import Home from './home.svelte';
	import Upload from './upload.svelte';

	const filesStore = getFilesStore();
	let hasFilesSelected = $derived(filesStore.files.length > 0);
</script>

<div class="grid grow gap-2 p-3 max-lg:grid-rows-1 sm:p-6 lg:grid-cols-2 lg:gap-8">
	{#if hasFilesSelected}
		<Upload />
	{:else}
		<Home />
	{/if}
	<div class="flex flex-col gap-2 p-2 lg:gap-4 lg:p-6 lg:pt-16">
		<h1 class="text-lg font-bold lg:text-3xl">Simple, private file sharing</h1>
		<p class="text-sm text-gray-600 lg:text-base">
			Send lets you share files with end-to-end encryption and a link that automatically expires.
			<br />
			So you can keep what you share private and make sure stuff doesn't stay online forever.
		</p>
	</div>
</div>
