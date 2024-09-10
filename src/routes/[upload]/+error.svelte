<script lang="ts">
	import { page } from '$app/stores';

	let error = $page.error?.message ?? 'Something went wrong..';
</script>

<div class="mx-auto flex max-w-2xl grow flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-2xl font-bold">{error}</h1>
	<p>These files may have expired or reached their download limits.</p>
	<p>Contact the owner of the files for assistance and to verify their status.</p>
</div>
