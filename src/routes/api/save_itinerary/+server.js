import { time_key, list_id, ITINERARY_KEY } from '$lib/utils.js';
import { getKv, getUserId, setContext } from '$lib/server-utils.js';

export async function POST(context) {
	setContext(context);

	if (!getUserId()) return new Response('unauthorized', { status: 401 });

	const { platform, request } = context;
	const json = await request.json();

	if (!json.id) return new Response('ERROR: id is required', { status: 400 });

	async function updateTitle(key) {
		try {
			let items = (await getKv(key, 'json')) ?? {};

			if (items[json.id]?.title === json.title) return true;

			items[json.id] = { title: json.title, date: Date.now() };
			items[time_key] = Date.now();

			await platform.env.KV.put(key, JSON.stringify(items));
			console.log('stored list', key);

			return true;
		} catch (error) {
			console.log('failed', { key, id: json.id, title: json.title, error });
			return false;
		}
	}

	(await updateTitle(list_id(ITINERARY_KEY, 1))) || (await updateTitle(list_id(ITINERARY_KEY, 2)));
	await platform.env.KV.put(json.id, JSON.stringify(json));

	return new Response('ok');
}
