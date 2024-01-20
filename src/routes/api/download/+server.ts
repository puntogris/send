import { PRIVATE_S3_BUCKET, PRIVATE_S3_PREFIX } from '$env/static/private';
import { db } from '$lib/server/drizzle.js';
import { s3, expiresIn } from '$lib/server/s3.js';
import { uploads, files } from '$lib/server/schema.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { error, json } from '@sveltejs/kit';
import { and, eq, gte, lte } from 'drizzle-orm';

export const POST = async ({ locals, request }) => {
	if (!locals.authenticated) {
		return error(401, 'Not authed to do this!');
	}
	const { fileId, uploadId } = await request.json();

	const upload = await db
		.select()
		.from(uploads)
		.where(and(eq(uploads.id, uploadId), gte(uploads.expireAt, new Date())))
		.get();

	if (!upload) {
		throw error(404, 'Not found');
	}

	const file = await db
		.select()
		.from(files)
		.where(
			and(
				eq(files.upload, upload.id),
				lte(files.downloads, upload.expireDownloads),
				eq(files.id, fileId)
			)
		)
		.get();

	if (!file) {
		throw error(404, 'Not found');
	}

	const key = `${PRIVATE_S3_PREFIX}${file.id}`;

	const url = await getSignedUrl(
		s3,
		new GetObjectCommand({
			Bucket: PRIVATE_S3_BUCKET,
			Key: key
		}),
		{ expiresIn }
	);

	await db
		.update(files)
		.set({ downloads: file.downloads + 1 })
		.where(eq(files.id, file.id));

	return json({ url });
};
