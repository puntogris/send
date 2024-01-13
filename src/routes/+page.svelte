<script>
	import CirclePlusIcon from '$lib/icons/circlePlusIcon.svelte';
</script>

<div class="grid h-full grid-cols-2 gap-8 p-6">
	<div
		class="flex h-full flex-col justify-center rounded-md border-4 border-dashed border-gray-300 p-4"
	>
		<div class="flex flex-col items-center gap-8">
			<div class="text-blue-600">
				<CirclePlusIcon size={60} />
			</div>
			<div class="flex flex-col items-center gap-1">
				<h3 class="text-lg font-bold">Drag and drop files</h3>
				<h2>or click to send up to 1GB</h2>
			</div>
			<div class="flex flex-col items-center gap-2">
				<button class="rounded-lg bg-blue-600 p-3 text-white">Select files to upload</button>
				<h3 class="font-semibold text-blue-600">Sign in to send up to 2.5GB</h3>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-4 pt-16">
		<h1 class="text-3xl font-bold">Simple, private file sharing</h1>
		<p>
			Send lets you share files with end-to-end encryption and a link that automatically expires.<br
			/>
			So you can keep what you share private and make sure stuff doesn't stay online forever.
		</p>
	</div>
</div>
