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

	async function share() {
		await navigator.clipboard.writeText(
			`${location.origin}/login?${new URLSearchParams([
				['password', data.userId],
				['redirect', location.href]
			])}`
		);

		alert('copied to clipboard');
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class=" flex flex-col p-1">
	<ul class="flex gap-1 p-1">
		{#each [...urls, ...urls2] as item}
			<li class="border p-1" class:bg-amber-200={url.startsWith(item.url)}>
				<a href={item.url} onclick={() => location.replace(item.url)}>{item.title}</a>
			</li>
		{/each}
		<li class="flex flex-auto justify-end pr-2">
			<button onclick={share}
				><svg
					style="height: 32px; width: 32px;"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 640 640"
					><!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
						d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z"
					/></svg
				></button
			>
		</li>
	</ul>

	{@render children()}
</div>
