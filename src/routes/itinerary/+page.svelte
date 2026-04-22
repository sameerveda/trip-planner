<script>
	import List from '$lib/components/List.svelte';
	import { ITINERARY_KEY } from '$lib/utils.js';
	import { nanoid } from 'nanoid';

	const { data, params } = $props();
	const items = $derived(Object.entries(data.items ?? {}).map(([id, value]) => ({ id, ...value })));

	$effect(() => {
		if (!data.loggedIn)
			window.location = `/login?redirect=${encodeURIComponent(location.pathname)}`;
	});
</script>

<List items={data.items} title={ITINERARY_KEY} />
