import { db } from '$lib/server/drizzle.js';
import { files, uploads } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const uploadId = params.upload;

	const upload = await db.select().from(uploads).where(eq(uploads.id, uploadId)).get();

	if (!upload) {
		return error(404, 'Files not found');
	}

	const uploadFiles = await db.select().from(files).where(eq(files.upload, uploadId));

	if (uploadFiles.length === 0) {
		return error(404, 'Files not found');
	}

	return { files: uploadFiles, upload };
}
