import { ensureLoggedIn, setContext } from '$lib/server-utils.js';
import { list_id, time_key } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load(context) {
	setContext(context);
	ensureLoggedIn();

	return {
		items: []
	};
}
