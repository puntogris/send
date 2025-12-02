<script lang="ts">
	import { getFilesStore } from '$lib/stores.svelte';
	import Home from './home.svelte';
	import Upload from './upload.svelte';

	const filesStore = getFilesStore();
	let hasFilesSelected = $derived(filesStore.files.length > 0);
</script>

<div class="flex h-full w-full grow justify-center p-4 sm:p-6 lg:p-8">
	<div class="grid w-full grow grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
		<div class="h-full w-full">
			{#if hasFilesSelected}
				<Upload />
			{:else}
				<Home />
			{/if}
		</div>

		<div class="flex flex-col gap-4 lg:gap-8 text-center lg:text-left">
			<div class="space-y-4">
				<h1 class="text-lg font-bold tracking-tight text-gray-900 sm:text-5xl">
					Simple, private <br class="hidden lg:block" />
					<span class="text-blue-600">file sharing</span>
				</h1>
				<p class="mx-auto max-w-xl text-sm lg:text-base text-gray-500 lg:mx-0">
					Send lets you share files with end-to-end encryption and a link that automatically
					expires. Keep what you share private.
				</p>
			</div>

			<div class="flex flex-wrap justify-center gap-3 lg:justify-start">
				<div
					class="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600"
				>
					<svg class="size-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
					End-to-end encryption
				</div>
				<div
					class="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600"
				>
					<svg class="size-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Auto-expiry
				</div>
			</div>
		</div>
	</div>
</div>
