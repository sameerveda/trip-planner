import { getUserId, setContext } from '$lib/server-utils.js';
import { loadSharedListAll } from './api/update_shared_lists/shared_lists_server.js';

export async function load(context) {
	setContext(context);

	return {
		sharedList: await loadSharedListAll(),
		userId: getUserId()
	};
}
