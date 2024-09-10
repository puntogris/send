import { error, json } from '@sveltejs/kit';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3, expiresIn } from '$lib/server/s3.js';
import { PRIVATE_S3_BUCKET, PRIVATE_S3_PREFIX } from '$env/static/private';

export const POST = async ({ locals }) => {
	if (!locals.authenticated) {
		return error(401, 'Not authed to do this!');
	}
	const id = crypto.randomUUID();
	const key = PRIVATE_S3_PREFIX + id;

	const url = await getSignedUrl(
		s3,
		new PutObjectCommand({
			Bucket: PRIVATE_S3_BUCKET,
			Key: key,
			ContentType: 'application/octet-stream'
		}),
		{ expiresIn }
	);
	return json({ url, method: 'PUT', id });
};
