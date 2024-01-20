import { db } from '$lib/server/drizzle.js';
import { uploads } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { desc, gte } from 'drizzle-orm';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	const upload = await db.select().from(uploads).orderBy((desc(uploads.createdAt))).where(gte(uploads.expireAt, new Date()));

	if (!upload) {
		return error(404, 'Files not found');
	}

	return { uploads: upload };
}
