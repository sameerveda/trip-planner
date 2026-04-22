'use server';

import { getContext, getKv, getUserId } from '$lib/server-utils';

function saveKey(list_id) {
	if (!list_id) throw new Error('!list_id');

	const userId = getUserId();

	return userId ? `EOCNndtEmKdGn9oFGg7ni__${list_id}___${userId}` : null;
}

export async function loadSharedList(list_id) {
	const key = saveKey(list_id);

	return key ? ((await getKv(key, 'json')) ?? []) : [];
}

export async function updateSharedList(list_id, callback) {
	const key = saveKey(list_id);

	if (!key) throw new Error('unauthorized');

	const items = await loadSharedList(list_id);
	const result = await callback(items);

	await getContext().platform.env.KV.put(key, JSON.stringify(result));
}
