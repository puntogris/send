import { db } from '$lib/server/drizzle.js';
import { uploads, files } from '$lib/server/schema.js';
import { error, json } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const POST = async ({ locals, request }) => {
	if (!locals.authenticated) {
		return error(401, 'Not authed to do this!');
	}
	try {
		const { uploadFiles, expireAt, expireDownloads } = await request.json();

		const fileNames = uploadFiles.map((f: any) => f.name).join('/!@#/');

		const result = await db.transaction(async (tx) => {
			let uploadId;
			let inserted = false;
			const maxAttempts = 5;
			const now = new Date();

			for (let attempt = 0; attempt < maxAttempts && !inserted; attempt++) {
				uploadId = nanoid(4);
				const insertResult = await tx
					.insert(uploads)
					.values({
						id: uploadId,
						expireAt: new Date(expireAt),
						expireDownloads,
						createdAt: now,
						fileNames: fileNames
					})
					.onConflictDoNothing();

				if (insertResult.rowsAffected > 0) {
					for (const file of uploadFiles) {
						await tx.insert(files).values({
							id: file.id,
							name: file.name,
							size: file.size,
							upload: uploadId,
							createdAt: now
						});
					}
					inserted = true;
				}
			}

			if (!inserted) {
				error(500, 'Failed to insert after multiple attempts');
			}

			return uploadId;
		});

		return json({ upload: result });
	} catch (err) {
		console.error(err);
		return error(404, 'Bad request!');
	}
};
