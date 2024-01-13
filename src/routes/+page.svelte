<script lang="ts">
	import Home from './home.svelte';
	import Upload from './upload.svelte';

	let state = 'home';
</script>

<div class="grid h-full gap-8 p-6 max-md:grid-rows-2 md:grid-cols-2">
	{#if state == 'home'}
		<Home />
	{:else if state == 'upload'}
		<Upload />
	{/if}
	<div class="flex flex-col gap-4 pt-6 md:pt-16">
		<h1 class="text-3xl font-bold">Simple, private file sharing</h1>
		<p>
			Send lets you share files with end-to-end encryption and a link that automatically expires.<br
			/>
			So you can keep what you share private and make sure stuff doesn't stay online forever.
		</p>
	</div>
</div>
