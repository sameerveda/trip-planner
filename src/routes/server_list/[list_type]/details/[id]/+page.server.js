export async function load({ params, platform }) {
	return {
		item: await platform.env.KV.get(params.id, 'json')
	};
}
