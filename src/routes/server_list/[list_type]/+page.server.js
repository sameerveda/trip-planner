import { ensureLoggedIn, isLoggedIn } from '$lib/server-utils.js';
import { list_id, time_key } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load({ platform, params, cookies, request, url }) {
	ensureLoggedIn(url, platform, cookies);

	const a = await platform.env.KV.get(list_id(params.list_type, 1), 'json');
	const b = await platform.env.KV.get(list_id(params.list_type, 2), 'json');

	return { loggedIn: true, items: !a || !b ? a || b : a[time_key] > b[time_key] ? a : b };
}
