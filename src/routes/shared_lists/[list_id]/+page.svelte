<script>
	import BasicTextList from '$lib/components/BasicTextList.svelte';
	import { sharedList } from '$lib/stores/shared-lists';
	import { page } from '$app/state';

	const url = page.url.pathname;

	const { params, data } = $props();
	const isAll = $derived(params.list_id === 'all');

	let allItems = $state([]);

	$effect(() => (allItems = data.items));

	async function update(items, { type, item }) {
		await fetch('/api/update_shared_lists', {
			method: 'POST',
			body: JSON.stringify({ type, item, list_id: params.list_id })
		});

		if (isAll) sharedList.set(items);
		else allItems = items;
	}

	const toUrl = ({ id }) => `${url.replace(/\/$/, '')}/${id}`;
</script>

<BasicTextList
	saveKey={params.list_id}
	items={isAll ? $sharedList : allItems}
	title={isAll ? 'Shared Lists' : $sharedList.find((t) => t.id === params.list_id)?.title}
	onUpdated={update}
	addDelay={true}
	toUrl={isAll ? toUrl : null}
/>
