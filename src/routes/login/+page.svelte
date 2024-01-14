<script lang="ts">
	import { toast } from 'svelte-french-toast';

	export let form;

	$: {
		if (form?.error) {
			toast.error(form.error);
		}
	}
</script>

<form
	method="post"
	class="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6 p-4"
>
	<h1 class="text-2xl font-bold">Hey!</h1>
	<p class="text-center">
		This app is currently intended for personal use. If you're interested, feel free to explore the
		code on <a class="text-blue-600 hover:underline" href="github.com/puntogris/send-site">github</a
		> and consider forking it. I have plans to make it open for everyone to use at some point in the
		future.
	</p>
	<input
		class="w-full rounded-lg border p-2"
		type="password"
		name="password"
		placeholder="super secret password to enter"
	/>
	<button type="submit" class="w-full rounded-lg bg-blue-600 p-3 text-white">Login</button>
</form>
