<script>
	import { tick } from '$lib/utils';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';

	/**
	 * @type {{items: {title: string, id: string, date: number}[], title: string, addDelay?: boolean, toUrl?: (item: {title: string, id: string}) => string }}
	 */
	const { items, title, onUpdated, addDelay = false, toUrl } = $props();
	let current = $state('');
	let waiting = $state(false);

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
</script>

<main class="flex flex-col p-3">
	<header class="my-2 flex gap-3 border-b-2 pb-2">
		<h1 class="text-2xl">{title}</h1>
	</header>

	<ul>
		{#each items as item (item.id)}
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
			<li><h3>No {title} Items</h3></li>
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
