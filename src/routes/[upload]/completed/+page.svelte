<script lang="ts">
	import { writeToClipboard } from '$lib/utils.js';
	import { page } from '$app/stores';
	import ClipboardIcon from '$lib/icons/clipboardIcon.svelte';
	import CheckIcon from '$lib/icons/checkIcon.svelte';

	$: dowloadUrl = `${$page.url.host}/${$page.params.upload}`;
	let copiedPressed = false;
	let timeout: NodeJS.Timeout;

	function downloadFile() {
		copiedPressed = true;

		clearTimeout(timeout);
		writeToClipboard(dowloadUrl);

		timeout = setTimeout(() => (copiedPressed = false), 1000);
	}
</script>

<div class="mx-auto flex max-w-2xl grow flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-3xl font-bold">Files uploaded!</h1>
	<p class="text-center">
		This file was shared using send.puntogris with end-to-end encryption and a link that
		automatically expires.
	</p>
	<div class="flex items-center gap-2 overflow-hidden rounded-md border border-blue-500">
		<div class="line-clamp-1 px-4 text-xl font-medium">{dowloadUrl}</div>
		<button
			on:click={downloadFile}
			class="flex h-12 items-center justify-center gap-2 bg-blue-600 p-3 text-white hover:bg-blue-700"
		>
			{#if copiedPressed}
				<CheckIcon class="size-5" />
			{:else}
				<ClipboardIcon class="size-5" />
			{/if}
		</button>
	</div>
</div>
