import { ensureLoggedIn, getKv, setContext } from '$lib/server-utils.js';
import { ITINERARY_KEY, list_id, time_key } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load(context) {
	setContext(context);
	ensureLoggedIn();

	const a = await getKv(list_id(ITINERARY_KEY, 1), 'json');
	const b = await getKv(list_id(ITINERARY_KEY, 2), 'json');

	return { loggedIn: true, items: !a || !b ? a || b : a[time_key] > b[time_key] ? a : b };
}
