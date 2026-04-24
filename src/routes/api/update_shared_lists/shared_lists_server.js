'use server';

import { getContext, getKv, getUserId } from '$lib/server-utils';

/**
 * @param {string} list_id
 * @returns {string | null}
 */
function saveKey(list_id) {
	if (!list_id) throw new Error('!list_id');

	const userId = getUserId();

	return userId ? `EOCNndtEmKdGn9oFGg7ni__${list_id}___${userId}` : null;
}

/**
 * @param {string} list_id
 * @returns {Array<BasicTextItem>}
 */
export async function loadSharedList(list_id) {
	const key = saveKey(list_id);
	const items = key ? ((await getKv(key, 'json')) ?? []) : [];

	if (items.length || list_id === 'all') return items;

	const all = await loadSharedListAll();

	if (!all.some((t) => t.id === list_id)) throw new Error('list_id not found: ' + list_id);

	return items;
}

export async function loadSharedListAll() {
	return loadSharedList('all');
}

/**
 *
 * @param {string} list_id
 * @param {(old: BasicTextItem[]) => BasicTextItem[]} callback
 */
export async function updateSharedList(list_id, callback) {
	const key = saveKey(list_id);

	if (!key) throw new Error('unauthorized');

	const items = await loadSharedList(list_id);
	const result = await callback(items);

	await getContext().platform.env.KV.put(key, JSON.stringify(result));
}
