<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
	const url = page.url.pathname;

	const urls = [
		{ url: '/server_list/itinerary', title: 'Itinerary' },
		{ url: '/ui_list/my_items', title: 'My List' }
	];
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class=" flex flex-col p-1">
	<ul class="flex gap-1 p-1">
		{#each urls as item}
			<li class="border p-1" class:bg-amber-200={url.startsWith(item.url)}>
				<a href={item.url}>{item.title}</a>
			</li>
		{/each}
	</ul>

	{@render children()}
</div>
