import { db } from '$lib/server/drizzle.js';
import { uploads } from '$lib/server/schema.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	const upload = await db.select().from(uploads);

	return { isAuthenticated: locals.authenticated };
}
