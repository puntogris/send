import { db } from '$lib/server/drizzle.js';
import { uploads, files } from '$lib/server/schema.js';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
	if (!locals.authenticated) {
		return error(401, 'Not authed to do this!');
	}
	try {
		const { uploadFiles, expireAt, expireDownloads } = await request.json();

		const uploadId = crypto.randomUUID();

		await db.insert(uploads).values({
			id: uploadId,
			expireAt: new Date(expireAt),
			expireDownloads,
			createdAt: new Date()
		});

		await db.transaction(async (tx) => {
			for (const file of uploadFiles) {
				await tx.insert(files).values({
					id: file.id,
					name: file.name,
					size: file.size,
					upload: uploadId,
					createdAt: new Date()
				});
			}
		});
		return json({ upload: uploadId });
	} catch (err) {
		console.error(err);
		return error(404, 'Bad request!');
	}
};
