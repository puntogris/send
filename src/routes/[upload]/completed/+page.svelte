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

<div class="mx-auto flex w-full max-w-2xl grow flex-col items-center justify-center p-4">
	<div class="flex w-full flex-col items-center gap-8 rounded-3xl p-8 text-center">
		<div class="flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600">
			<CheckIcon class="size-10" />
		</div>

		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-bold text-gray-900">Transfer Complete!</h1>
			<p class="text-gray-600">
				Your files are ready to share. This link will expire automatically based on your settings.
			</p>
		</div>

		<div class="flex w-full flex-col gap-2">
			<label for="link" class="text-left text-sm font-medium text-gray-700">Share link</label>
			<div class="relative flex w-full items-center">
				<input 
					id="link"
					readonly 
					value={dowloadUrl} 
					class="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-14 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
				/>
				<button
					onclick={downloadFile}
					class="absolute right-2 rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
					title="Copy link"
				>
					{#if copiedPressed}
						<CheckIcon class="size-5" />
					{:else}
						<ClipboardIcon class="size-5" />
					{/if}
				</button>
			</div>
		</div>

		<div class="h-px w-full bg-gray-100"></div>

		<a 
			href="/"
			class="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-300"
		>
			Send another file
		</a>
	</div>
</div>
