import { db } from '$lib/server/drizzle.js';
import { getDownloadUrl } from '$lib/server/s3.js';
import { uploads, files } from '$lib/server/schema.js';
import { error, json } from '@sveltejs/kit';
import { and, eq, gte, lte } from 'drizzle-orm';

export const POST = async ({ request }) => {
	const { fileId, uploadId } = await request.json();

	const [upload] = await db
		.select()
		.from(uploads)
		.where(and(eq(uploads.id, uploadId), gte(uploads.expireAt, new Date())))
		.limit(1);

	if (!upload) {
		throw error(404, 'Not found');
	}

	const [file] = await db
		.select()
		.from(files)
		.where(
			and(
				eq(files.upload, upload.id),
				lte(files.downloads, upload.expireDownloads),
				eq(files.id, fileId)
			)
		)
		.limit(1);

	if (!file) {
		throw error(404, 'Not found');
	}

	const url = await getDownloadUrl(file.id, file.name);

	await db
		.update(files)
		.set({ downloads: file.downloads + 1 })
		.where(eq(files.id, file.id));

	return json({ url });
};
