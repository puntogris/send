<script>
	import '../app.css';
</script>

<div class="flex h-screen min-h-screen flex-col bg-gradient-to-br from-gray-100 to-blue-50">
	<header class="flex items-center justify-between p-4">
		<h1 class="text-xl font-medium">send.</h1>
		<button class="rounded-md border border-blue-600 p-2 text-blue-600">Sign in/up</button>
	</header>
	<div class="h-full px-12 py-8">
		<slot />
	</div>
	<footer class="mt-auto flex items-center justify-between px-6 py-4">
		<h3 class="text rounded-sm bg-black p-1 font-bold text-white">https://puntogris.com</h3>
		<div class="flex gap-3">
			<h4 class="text-sm text-gray-500">Contact</h4>
			<h4 class="text-sm text-gray-500">Github</h4>
			<h4 class="text-sm text-gray-500">Help</h4>
		</div>
	</footer>
</div>
