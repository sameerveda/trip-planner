import { getUserId, setContext } from '$lib/server-utils.js';
import { list_id, SHARE_LISTS_SAVE_KEY, time_key } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { loadSharedList } from './api/update_shared_lists/shared_lists_server.js';

export async function load(context) {
	setContext(context);

	return {
		sharedList: await loadSharedList('all'),
		userId: getUserId()
	};
}
