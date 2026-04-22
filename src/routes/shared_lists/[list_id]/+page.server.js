import { ensureLoggedIn, setContext } from '$lib/server-utils.js';
import { list_id, time_key } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { loadSharedList } from '../../api/update_shared_lists/shared_lists_server.js';

export async function load(context) {
	setContext(context);
	ensureLoggedIn();

	return {
		items: await loadSharedList(context.params.list_id)
	};
}
