import { AUTH_PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const authCookie = event.cookies.get('auth');

	if (authCookie != AUTH_PASSWORD && !event.url.pathname.startsWith('/login')) {
		return redirect(302, '/login');
	}

	const response = await resolve(event);
	return response;
}
