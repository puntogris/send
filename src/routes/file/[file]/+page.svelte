<script lang="ts">
	import FileIcon from '$lib/icons/fileIcon.svelte';

	export let data;
</script>

<div class="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-3xl font-bold">Download files</h1>
	<p class="text-center">
		This file was shared using send.puntogris with end-to-end encryption and a link that
		automatically expires.
	</p>
	<div class="flex w-full items-center gap-2 rounded border p-2">
		<div class="text-blue-500">
			<FileIcon size={40} />
		</div>
		<div class="flex flex-col">
			<h1>{data.fileName}</h1>
			<p class="text-xs text-gray-600">1.5MB</p>
		</div>
	</div>
	<button class="w-full rounded-lg bg-blue-600 p-3 text-white">Download</button>
</div>
