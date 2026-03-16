<script>
	let key = $state('');
	let error = $state(false);

	async function login() {
		const res = await fetch('/api/login', { body: key, method: 'POST' });
		if (res.status > 299 || res.status < 200) error = true;
		else location.reload();
	}
</script>

<div class="flex gap-2">
	<label class="flex items-center justify-center gap-2">
		<span class="text-nowrap">Login Key</span><input
			bind:value={key}
			class="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand placeholder:text-body block w-full border text-sm shadow-xs"
			type="text"
		/>
	</label>
	<button
		onclick={login}
		disabled={!key?.trim()}
		class="box-border rounded-full border border-transparent bg-green-600 px-2 py-1 text-sm leading-5 font-medium text-white shadow-xs hover:bg-green-900 focus:ring-4 focus:ring-red-100 focus:outline-none"
		>LOGIN</button
	>
	{#if error}
		<span class="text-red">Invalid Key</span>
	{/if}
</div>
