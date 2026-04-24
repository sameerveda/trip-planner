<script>
	import { tick } from '$lib/utils';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';

	/**
	 * @type {{saveKey: string, items: BasicTextItem[], title: string, addDelay?: boolean, toUrl?: (item: BasicTextItem) => string }}
	 */
	const { saveKey, items, title, onUpdated, addDelay = false, toUrl } = $props();

	const saveKeyState = $derived(`${saveKey}-state`);

	let current = $state('');
	let waiting = $state(false);
	let sorted = $state(false);
	let uniq = $state(true);
	let initialized = $state(false);

	$effect(() => {
		if (initialized) localStorage.setItem(saveKeyState, JSON.stringify({ sorted, uniq }));
	});

	onMount(() => {
		if (localStorage.getItem(saveKeyState)) {
			const state = JSON.parse(localStorage.getItem(saveKeyState));

			sorted = state.sorted;
			uniq = state.uniq;
		}

		initialized = true;
	});

	async function wrap(result) {
		waiting = true;

		try {
			await result;
		} catch (error) {
			alert(String(error));
		} finally {
			if (addDelay) await tick(1500);
			waiting = false;
		}
	}

	async function _save() {
		if (!current?.trim()) return;

		const conflict = items.find(
			(t) => t.title.replace(/\s+/g, '').toLowerCase() === current.replace(/\s+/g, '').toLowerCase()
		);

		if (uniq && conflict) return alert(`conflict with: ${JSON.stringify(conflict)}`);

		const item = { title: current, id: nanoid(), date: Date.now() };

		await onUpdated([...items, item], {
			type: 'save',
			value: current,
			item
		});

		current = '';
	}

	const save = () => wrap(_save());

	async function remove(item) {
		const oldItems = items;
		const items2 = [...items];
		const index = items.findIndex((t) => t.id === item.id);
		items2.splice(index, 1);

		await onUpdated(items2, { type: 'remove', index, item, oldItems, newItems: items2 });
	}

	const viewItems = $derived(
		sorted ? items.toSorted((a, b) => a.title.localeCompare(b.title)) : items
	);
</script>

<main class="flex flex-col p-3">
	<header class="my-2 flex gap-3 border-b-2 pb-2">
		<h1 class="text-2xl">{title}</h1>
	</header>

	<ul>
		<li style="border-bottom: 1px dotted lightgray;" class="flex gap-2 p-1">
			<label class="mr-1 flex items-center gap-1">
				<input type="checkbox" bind:checked={sorted} /> <span>Sorted</span>
			</label>
			<label class="mr-1 flex items-center gap-1">
				<input type="checkbox" bind:checked={uniq} /> <span>Uniq</span>
			</label>
		</li>
		{#each viewItems as item (item.id)}
			<li style="border-bottom: 1px dotted lightgray;" class="flex p-1">
				{#if toUrl}
					<a class="flex-auto" href={toUrl(item)}>{item.title}</a>
				{:else}
					<span class="flex-auto">{item.title}</span>
				{/if}

				<button
					disabled={waiting}
					class="border bg-red-500 px-3 pb-1 text-white"
					onclick={() => wrap(remove(item))}>x</button
				>
			</li>
		{:else}
			<li><h3><strong>No Items</strong></h3></li>
		{/each}
		<li class="flex gap-1 p-2">
			<input
				class="flex-auto border indent-1 caret-black"
				placeholder="add new item"
				type="text"
				onkeyup={(e) => e.key === 'Enter' && current?.trim() && save()}
				bind:value={current}
				disabled={waiting}
			/><button
				class="border bg-green-300 px-4 py-2"
				onclick={save}
				disabled={waiting || !current?.trim()}>Add</button
			>
		</li>
		{#if waiting}
			<li style="color: green;">Updating</li>
		{/if}
	</ul>
</main>
