import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.authenticated) {
		redirect(302, '/login');
	}
}
