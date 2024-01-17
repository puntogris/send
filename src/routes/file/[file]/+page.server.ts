import { db } from '$lib/server/drizzle.js';
import { files } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const uploadId = params.file;

	const result = await db.select().from(files).where(eq(files.id, uploadId));

	return { files: result };

	return error(404, 'File not found');
}
