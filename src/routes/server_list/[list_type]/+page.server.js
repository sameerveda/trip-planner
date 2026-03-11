import { list_id, time_key } from '../../../lib/utils';

export async function load({ platform, params }) {
	const a = await platform.env.KV.get(list_id(params.list_type, 1), 'json');
	const b = await platform.env.KV.get(list_id(params.list_type, 2), 'json');

	return { items: !a || !b ? a || b : a[time_key] > b[time_key] ? a : b };
}
