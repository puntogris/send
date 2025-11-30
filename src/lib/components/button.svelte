<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let variant: 'solid' | 'outline' | 'ghost' = 'solid';
	export let onClick: () => void = () => {};
	export let loading = false;
</script>

<button
	{...$$props}
	class={twMerge(
		'flex items-center justify-center rounded-lg border px-5 py-2 text-sm',
		variant === 'solid'
			? 'border-transparent bg-blue-600 text-white hover:bg-blue-700'
			: variant === 'outline'
				? 'border-blue-400 text-blue-600 hover:border-blue-500'
				: 'border-transparent text-white hover:text-blue-500',
		$$props.class
	)}
	disabled={loading || $$props.disabled}
	on:click={onClick}
>
	{#if loading}
		<div
			class={twMerge(
				'size-5 animate-spin rounded-full border border-current border-t-transparent',
				variant === 'solid' ? ' text-white' : ' text-blue-500'
			)}
			role="status"
			aria-label="loading"
		></div>
	{:else}
		<slot />
	{/if}
</button>
