'use server';

import { redirect } from '@sveltejs/kit';
import { AUTH_KEY } from './utils';

/**
 * @type {Cloudfla}
 */
let _context;

export function setContext(context) {
	_context = context;
}

export function getContext(context) {
	if (!_context) throw new Error('context not set');

	return _context;
}

let _authKeys;

export function authKeys(platform = getContext().platform) {
	return (_authKeys =
		_authKeys ??
		new Set(
			platform.env.AUTH_VALUE.split(',')
				.map((s) => s.trim())
				.filter(Boolean)
		));
}

export function getUserId() {
	const { platform, cookies } = getContext();
	const id = cookies.get(AUTH_KEY);

	return authKeys(platform).has(id) ? id : null;
}

export function ensureLoggedIn(url = getContext().url) {
	if (!getUserId()) throw redirect(307, `/login?redirect=${encodeURIComponent(url)}`);
}

export function getKv(...props) {
	return getContext().platform.env.KV.get(...props);
}