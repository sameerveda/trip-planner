'use server';

import { redirect } from '@sveltejs/kit';
import { AUTH_KEY } from './utils';

export const isLoggedIn = (platform, cookies) => cookies.get(AUTH_KEY) === platform.env.AUTH_KEY;

export function ensureLoggedIn(url, platform, cookies) {
	if (!isLoggedIn(platform, cookies))
		throw redirect(307, `/login?redirect=${encodeURIComponent(url)}`);
}
