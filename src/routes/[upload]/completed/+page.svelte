<script lang="ts">
	import { writeToClipboard } from '$lib/utils.js';
	import { page } from '$app/state';
	import ClipboardIcon from '$lib/icons/clipboardIcon.svelte';
	import CheckIcon from '$lib/icons/checkIcon.svelte';

	let dowloadUrl = $derived(`${page.url.host}/${page.params.upload}`);
	let copiedPressed = $state(false);
	let timeout: NodeJS.Timeout;

	function downloadFile() {
		copiedPressed = true;

		clearTimeout(timeout);
		writeToClipboard(dowloadUrl);

		timeout = setTimeout(() => (copiedPressed = false), 1000);
	}
</script>

<div class="mx-auto flex w-full max-w-2xl grow flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-3xl font-bold">Files uploaded!</h1>
	<p class="text-center">
		This file was shared using send.puntogris with end-to-end encryption and a link that
		automatically expires.
	</p>
	<div
		class="flex w-full max-w-md items-center justify-between gap-2 rounded-md border border-blue-500"
	>
		<div class="truncate px-2 font-medium sm:px-4 sm:text-xl">
			{dowloadUrl}
		</div>
		<button
			onclick={downloadFile}
			class="flex h-10 items-center justify-center gap-2 bg-blue-600 p-3 text-white hover:bg-blue-700 sm:h-12"
		>
			{#if copiedPressed}
				<CheckIcon class="size-5" />
			{:else}
				<ClipboardIcon class="size-5" />
			{/if}
		</button>
	</div>
</div>
