import { isLoggedIn } from '$lib/server-utils.js';
import { redirect } from '@sveltejs/kit';

export async function load({ platform, params, cookies, url }) {
	if (isLoggedIn(platform, cookies)) throw redirect(307, url.searchParams.get('redirect') || '/');
}
