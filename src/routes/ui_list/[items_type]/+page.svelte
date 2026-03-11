<script>
	import List from '$lib/components/List.svelte';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';

	const { params } = $props();
	let items = $state([]);
	let current = $state('');

	const title = $derived(params.list_type);
	const saveKey = $derived(`list-${params.list_type}`);

	$effect(() => {
		items = JSON.parse(localStorage.getItem(saveKey) ?? '[]');
	});

	function remove(index) {
		items = [...items];
		items.splice(index, 1);
		localStorage.setItem(saveKey, JSON.stringify(items));
	}

	function save() {
		items = [...items, current];
		current = '';
		localStorage.setItem(saveKey, JSON.stringify(items));
	}
</script>

<main class="flex flex-col p-3">
	<header class="my-2 flex gap-3 border-b-2 pb-2">
		<h1 class="text-2xl">{title}</h1>
	</header>

	<ul>
		{#each items as item, index}
			<li style="border-bottom: 1px dotted lightgray;" class="flex p-1">
				{item}
				<div class="flex-auto"></div>
				<button class="border bg-red-500 px-3 pb-1 text-white" onclick={() => remove(index)}
					>x</button
				>
			</li>
		{:else}
			<li><h3>No {title} Items</h3></li>
		{/each}
		<li class="flex gap-1 p-2">
			<input
				class="flex-auto border indent-1 caret-black"
				placeholder="add new item"
				type="text"
				onkeyup={(e) => e.key === 'Enter' && current?.trim() && save()}
				bind:value={current}
			/><button class="border bg-green-300 px-4 py-2" onclick={save} disabled={!current?.trim()}
				>Add</button
			>
		</li>
	</ul>
</main>
