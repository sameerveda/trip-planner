import { ensureLoggedIn, getKv, setContext } from '$lib/server-utils.js';

export async function load(context) {
	setContext(context);
	ensureLoggedIn();

	return {
		item: await getKv(params.id, 'json'),
		loggedIn: true
	};
}
