<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { initializeStores } from '$lib/stores.svelte';
	import SendIcon from '$lib/icons/sendIcon.svelte';
	import GithubIcon from '$lib/icons/githubIcon.svelte';

	initializeStores();
</script>

<Toaster />

<div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-100 to-blue-50">
	<a href="/" class="flex items-center gap-2 p-5 text-xl font-medium">
		<SendIcon class="h-5 w-5" />
		send.
	</a>
	<div class="mx-2 my-8 flex grow flex-col rounded-xl bg-white shadow-lg sm:mx-16">
		<slot />
	</div>
	<footer class="mt-auto flex flex-wrap items-center justify-between gap-2 px-6 py-4">
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
