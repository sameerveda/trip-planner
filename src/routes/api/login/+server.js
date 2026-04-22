import { setContext } from '$lib/server-utils.js';
import { login } from './login.js';

export async function POST(context) {
	setContext(context);

	return login(await context.request.text())
		? new Response('ok')
		: new Response('mismatch', { status: 400 });
}
