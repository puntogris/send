import { db } from '$lib/server/drizzle.js';
import { files, uploads } from '$lib/server/schema.js';
import { error } from '@sveltejs/kit';
import { and, eq, lte } from 'drizzle-orm';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const uploadId = params.upload;

	const upload = await db.select().from(uploads).where(eq(uploads.id, uploadId)).get();

	if (!upload) {
		return error(404, 'Files not found');
	}

	if (new Date() >= upload.expireAt) {
		return error(404, 'Files expired or not found!');
	}

	const uploadFiles = await db
		.select()
		.from(files)
		.where(and(eq(files.upload, uploadId), lte(files.downloads, upload.expireDownloads)));

	if (uploadFiles.length === 0) {
		return error(404, 'Files expired or not found!');
	}

	return { files: uploadFiles, upload };
}
