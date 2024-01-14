<script>
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />

<div class="flex h-screen min-h-screen flex-col bg-gradient-to-br from-gray-100 to-blue-50">
	<header class="flex items-center justify-between p-4">
		<a href="/" class="text-xl font-medium">send.</a>
		<!-- <button class="rounded-md border border-blue-600 p-2 text-blue-600">Sign in/up</button> -->
	</header>
	<div class="mx-16 my-8 h-full rounded-xl bg-white shadow-lg">
		<slot />
	</div>
	<footer class="mt-auto flex items-center justify-between px-6 py-4">
		<a
			href="https://www.puntogris.com/"
			target="_blank"
			class="text rounded-sm bg-black p-1 font-bold text-white">https://puntogris.com</a
		>
		<div class="flex gap-3">
			<h4 class="text-sm text-gray-500">Contact</h4>
			<h4 class="text-sm text-gray-500">Github</h4>
			<h4 class="text-sm text-gray-500">Help</h4>
		</div>
	</footer>
</div>
