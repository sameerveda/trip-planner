<script>
	import { nanoid } from 'nanoid';
	import { page } from '$app/state';

	const { items: items0, title, children } = $props();
	const base = $derived(`${page.url.pathname}/details/`.replaceAll('//', '/'));
	const items = $derived(Object.entries(items0 ?? {}).map(([id, value]) => ({ id, ...value })));
</script>

<main class="flex flex-col p-3">
	<header class="my-2 flex gap-3 border-b-2 pb-2">
		<h1 class="text-2xl">{title}</h1>
	</header>

	<ul>
		{#each items as item}
			<li style="border-bottom: 1px dotted lightgray;" class="p-1">
				<a href={`${base}${item.id}`}>{item.title}</a>
			</li>
		{:else}
			<h3>No {title} Items</h3>
		{/each}
		{#if children}
			{@render children()}
		{/if}
	</ul>
	<div class="mt-5 text-center">
		<a href={`${base}${nanoid()}`} class="border-2 bg-green-600 px-4 pb-2 text-4xl text-white">+</a>
	</div>
</main>
