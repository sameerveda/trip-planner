<script>
	import List from '$lib/components/List.svelte';
	import { nanoid } from 'nanoid';

	const { data, params } = $props();
	const items = $derived(Object.entries(data.items ?? {}).map(([id, value]) => ({ id, ...value })));
</script>

<List items={data.items} title={params.list_type} />
