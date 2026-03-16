import { AUTH_KEY } from '$lib/utils.js';

export async function POST({ platform, request, cookies }) {
	const key = await request.text();

	if (platform.env.AUTH_KEY === key) {
		cookies.set(AUTH_KEY, key, { httpOnly: false, secure: false, path: '/' });
		return new Response('ok');
	}

	return new Response('mismatch', { status: 400 });
}
