import { db } from '$lib/server/drizzle.js';
import { sendFiles } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const fileId = params.file;

	const result = await db.select().from(sendFiles).where(eq(sendFiles.id, fileId)).limit(1);

	if (result[0]) {
		return { file: result[0] };
	}

	return error(404, 'File not found');
}
