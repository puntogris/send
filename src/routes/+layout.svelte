<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { initializeStores } from '$lib/stores';

	export let data;

	initializeStores();
</script>

<Toaster />

<div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-100 to-blue-50">
	<header class="flex items-center justify-between p-4">
		<a href="/" class="text-xl font-medium">send.</a>
		{#if data.isAuthenticated}
			<a href="/uploads" class="rounded-md border border-blue-600 p-2 text-sm text-blue-600"
				>My uploads</a
			>
		{/if}
	</header>
	<div class="mx-16 my-8 flex grow flex-col rounded-xl bg-white shadow-lg">
		<slot />
	</div>
	<footer class="mt-auto flex items-center justify-between px-6 py-4">
		<a
			href="https://www.puntogris.com/"
			target="_blank"
			class="text rounded-sm bg-black p-1 font-bold text-white hover:underline"
			>https://puntogris.com</a
		>
		<div class="flex gap-3">
			<a
				href="https://www.puntogris.com/"
				target="_blank"
				class="text-sm text-gray-500 hover:underline">Contact</a
			>
			<a
				href="https://www.github.com/puntogris/send-site"
				target="_blank"
				class="text-sm text-gray-500 hover:underline">Github</a
			>
		</div>
	</footer>
</div>
