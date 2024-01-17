import { PRIVATE_AUTH_PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const authCookie = event.cookies.get('auth');

	event.locals.authenticated = authCookie === PRIVATE_AUTH_PASSWORD;

	if (
		authCookie != PRIVATE_AUTH_PASSWORD &&
		!event.url.pathname.startsWith('/login') &&
		!event.url.pathname.startsWith('/file')
	) {
		return redirect(302, '/login');
	}

	const response = await resolve(event);
	return response;
}
