import { getUserId } from '$lib/server-utils.js';
import { list_id, SHARE_LISTS_SAVE_KEY, time_key } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { loadSharedList } from './api/update_shared_lists/shared_lists_server.js';

export async function load({ platform, params, cookies, request, url }) {
	return {
		sharedList: await loadSharedList(platform, cookies)
	};
}
