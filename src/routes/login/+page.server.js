import { getUserId, setContext } from '$lib/server-utils.js';
import { redirect } from '@sveltejs/kit';

export async function load(context) {
	setContext(context);

	if (getUserId()) throw redirect(307, context.url.searchParams.get('redirect') || '/');
}
