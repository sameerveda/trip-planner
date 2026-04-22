import { authKeys } from '$lib/server-utils.js';
import { AUTH_KEY } from '$lib/utils.js';
import { getUserId, setContext } from '$lib/server-utils.js';
import { loadSharedList, updateSharedList } from './shared_lists_server.js';

export async function POST(context) {
	setContext(context);

	const userId = getUserId();
	if (!userId) return new Response('unauthorized', { status: 401 });

	const { type, item, list_id } = await request.json();

	if (!list_id) return new Response('invalid list_id: ' + list_id, { status: 400 });

	if (!item?.title || !item?.id)
		return new Response('invalid item: ' + JSON.stringify(item), { status: 400 });

	if (type === 'save') {
		await updateSharedList(list_id, (old) =>
			old.some((t) => t.id === item.id)
				? old.map((t) => (t.id === item.id ? item : t))
				: [...old, item]
		);
	} else if (type === 'remove') {
		await updateSharedList(list_id, (old) => old.filter((t) => t.id !== item.id));
	} else {
		return new Response('invalid type: ' + type, { status: 400 });
	}

	console.log({ type, item });
	return new Response('updated', { status: 200 });
}
