import { db } from '$lib/server/drizzle.js';
import { uploads } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const upload = await db.select().from(uploads);

	if (!upload) {
		return error(404, 'Files not found');
	}

	return { upload };
}
