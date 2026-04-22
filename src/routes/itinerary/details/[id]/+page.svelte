<script>
	import { fileToUrl, ITINERARY_KEY } from '$lib/utils.js';
	import { Tipex } from '@friendofsvelte/tipex';

	const { data, params } = $props();

	let body = $state('');
	let title = $state('');
	let editor = $state('');
	let init = $state(false);

	const back = () => (window.location = location.pathname.split('/details/')[0]);

	$effect(() => {
		if (data) {
			body = data.item?.body;
			title = data.item?.title;
		}

		init = true;
	});

	async function handleImageUpload(event, tipex) {
		for (const file of event.target.files) {
			tipex.commands.setImage({ src: await fileToUrl(file) });
		}
	}

	async function save() {
		const body = editor.getHTML();

		if (title !== data.item?.title || body !== data.item?.body) {
			const res = await fetch('/api/save_itinerary', {
				method: 'POST',
				body: JSON.stringify({
					title,
					body,
					id: params.id,
					list_type: ITINERARY_KEY
				})
			});

			if (res.status > 299 || res.status < 200) error = true;
		}

		back();
	}
</script>

<div class="flex flex-col gap-3 p-4">
	<small class="text-xs">{params.id}</small>
	<label class="flex flex-col text-2xl">
		<span>Title</span>
		<input type="text" class="flex-auto border indent-1 caret-black" bind:value={title} /></label
	>
	{#if init}
		<div class="flex">
			<Tipex class="flex-auto" bind:tipex={editor} {body} floating focal>
				{#snippet controlComponent(tipex)}
					{#if tipex}
						<div
							class="bg-minimal-surface border-minimal-border flex items-center gap-2 border-t px-3 py-2"
						>
							<button
								class="utility-btn"
								onclick={() => tipex.commands.toggleBold()}
								class:active={tipex.isActive('bold')}
								title="Bold (Ctrl+B)"
								aria-label="Bold"
							>
								B
							</button>

							<button
								class="utility-btn"
								onclick={() => tipex.commands.toggleItalic()}
								class:active={tipex.isActive('italic')}
								title="Italic (Ctrl+I)"
								aria-label="Italic"
							>
								I
							</button>

							<label class="tipex-edit-button tipex-button-rigid relative block">
								<input
									type="file"
									accept="image/*"
									multiple
									class="invisible absolute top-0 left-0 z-10 h-full w-full"
									onchange={(e) => handleImageUpload(e, tipex)}
								/>

								<span>📷</span>
							</label>
						</div>
					{/if}
				{/snippet}
			</Tipex>
			<div style="width:32px"></div>
		</div>
	{/if}
	<div class="flex justify-end gap-3">
		<button class="bg-red-500 px-4 py-2 text-white" onclick={back}>Cancel</button>
		<button onclick={save} class="bg-green-900 px-4 py-2 text-white">Save</button>
	</div>
</div>

<style>
</style>
