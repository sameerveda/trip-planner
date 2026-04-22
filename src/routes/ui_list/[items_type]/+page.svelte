<script>
	import BasicTextList from '$lib/components/BasicTextList.svelte';

	const { params } = $props();

	let items = $state([]);

	const title = $derived(params.list_type);
	const saveKey = $derived(`list-v2-${params.list_type}`);

	$effect(() => {
		items = JSON.parse(localStorage.getItem(saveKey) ?? '[]');
	});

	function onUpdated(update) {
		items = update;
		localStorage.setItem(saveKey, JSON.stringify(update));
	}
</script>

<BasicTextList saveKey={`${params.list_type}-ui-list`} {items} {title} {onUpdated} />
