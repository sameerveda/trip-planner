import { authKeys, getContext } from '$lib/server-utils.js';
import { AUTH_KEY } from '$lib/utils.js';

export function login(password) {
	if (!authKeys().has(password)) return false;

	getContext().cookies.set(AUTH_KEY, password, { httpOnly: false, secure: false, path: '/' });

	return true;
}
