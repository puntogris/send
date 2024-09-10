<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { initializeStores } from '$lib/stores';
	import SendIcon from '$lib/icons/sendIcon.svelte';
	import GithubIcon from '$lib/icons/githubIcon.svelte';

	export let data;

	initializeStores();
</script>

<Toaster />

<div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-100 to-blue-50">
	<a href="/" class="flex items-center gap-2 p-5 text-xl font-medium">
		<SendIcon class="h-5 w-5" />
		send.
	</a>
	<div class="mx-16 my-8 flex grow flex-col rounded-xl bg-white shadow-lg">
		<slot />
	</div>
	<footer class="mt-auto flex items-center justify-between px-6 py-4">
		<a
			href="https://www.puntogris.com/"
			target="_blank"
			class="rounded-sm bg-black px-2 py-0.5 text-sm font-semibold text-white hover:underline"
			>https://puntogris.com</a
		>
		<div class="flex gap-3">
			<a
				href="https://www.github.com/puntogris/send-site"
				target="_blank"
				class="flex items-center gap-1 text-sm text-gray-500 hover:underline"
			>
				<GithubIcon class="h-4 w-4" />
				Github</a
			>
		</div>
	</footer>
</div>
