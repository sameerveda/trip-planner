import { time_key, list_id } from '$lib/utils.js';
import { isLoggedIn } from '$lib/server-utils.js';

export async function POST({ platform, request, cookies }) {
	if (!isLoggedIn(platform, cookies)) return new Response('unauthorized', { status: 401 });

	const json = await request.json();
	const list_type = json.list_type;

	if (!list_type) return new Response('ERROR: list_type is required', { status: 400 });
	if (!json.id) return new Response('ERROR: id is required', { status: 400 });

	async function updateTitle(key) {
		try {
			let items = (await platform.env.KV.get(key, 'json')) ?? {};

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

	(await updateTitle(list_id(list_type, 1))) || (await updateTitle(list_id(list_type, 2)));
	await platform.env.KV.put(json.id, JSON.stringify(json));

	return new Response('ok');
}
