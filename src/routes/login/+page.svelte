<script lang="ts">
	import type { PageProps } from './$types';
	import Button from '$lib/components/button.svelte';
	import { toast } from 'svelte-sonner';

	let { form }: PageProps = $props();

	$effect(() => {
		if (form?.error) {
			toast.error(form.error);
		}
	});
</script>

<div class="flex h-full w-full grow items-center justify-center p-4 sm:p-6 lg:p-8">
	<form
		method="post"
		class="flex w-full max-w-md flex-col items-center gap-8 rounded-3xl p-2 text-center lg:p-8"
	>
		<div class="flex flex-col items-center gap-2">
			<h1 class="text-2xl font-bold text-gray-900">Hey!</h1>
			<p class="text-sm text-gray-500 lg:text-base">
				This app is currently intended for personal use. If you're interested, feel free to explore
				the code on
				<a class="text-blue-600 hover:underline" href="https://github.com/puntogris/send-site">
					github
				</a>
				and consider forking it.
			</p>
		</div>

		<div class="flex w-full flex-col gap-4">
			<input
				class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
				type="password"
				name="password"
				placeholder="Enter password"
			/>
			<Button
				class="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
				type="submit">Login</Button
			>
		</div>
	</form>
</div>
