<script lang="ts">
	import { page } from '$app/stores';

	let error = $page.error?.message ?? 'Something went wrong..';
</script>

<div class="mx-auto flex max-w-2xl grow flex-col items-center justify-center text-center">
	<h1 class="text-2xl font-bold mb-4">{error}</h1>
	<p>Oops! It seems like there's an issue with accessing the files.</p>
	<p>These files may have expired or reached their download limits.</p>
	<p>Contact the owner of the files for assistance and to verify their status.</p>
</div>
