import { getUserId, setContext } from '$lib/server-utils.js';
import { redirect } from '@sveltejs/kit';
import { login } from '../api/login/login.js';

export async function load(context) {
	setContext(context);

	const [password, redirectUrl] = [
		context.url.searchParams.get('password'),
		context.url.searchParams.get('redirect')
	];

	if ((password && login(password)) || getUserId()) throw redirect(307, redirectUrl || '/');
}
