<script>
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import { sharedList } from '$lib/stores/shared-lists';
	import { onMount } from 'svelte';
	import './layout.css';

	let { children, data } = $props();
	const url = page.url.pathname;

	$effect(() => sharedList.set(data.sharedList));

	const urls = [
		{ url: '/itinerary', title: 'Itinerary' },
		{ url: '/ui_list/my_items', title: 'My List' },
		{ url: '/shared_lists/all', title: 'Shared List(s)' }
	];

	const urls2 = $derived(
		$sharedList.map(({ title, id }) => ({ title, url: `/shared_lists/${id}` })) ?? []
	);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class=" flex flex-col p-1">
	<ul class="flex gap-1 p-1">
		{#each [...urls, ...urls2] as item}
			<li class="border p-1" class:bg-amber-200={url.startsWith(item.url)}>
				<a href={item.url} onclick={() => location.replace(item.url)}>{item.title}</a>
			</li>
		{/each}
	</ul>

	{@render children()}
</div>
