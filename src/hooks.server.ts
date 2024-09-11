import { PRIVATE_AUTH_PASSWORD } from '$env/static/private';

export async function handle({ event, resolve }) {
	const authCookie = event.cookies.get('auth');
	const isAuthenticated = authCookie === PRIVATE_AUTH_PASSWORD;

	event.locals.authenticated = isAuthenticated;

	const response = await resolve(event);
	return response;
}
