import { ensureLoggedIn } from '$lib/server-utils.js';

export async function load({ params, platform, url }) {
	ensureLoggedIn(url, platform, cookies);

	return {
		item: await platform.env.KV.get(params.id, 'json'),
		loggedIn: true
	};
}
