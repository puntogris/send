import { error, json } from '@sveltejs/kit';
import { getUploadUrl } from '$lib/server/s3.js';

export const POST = async ({ locals }) => {
	if (!locals.authenticated) {
		return error(401, 'Not authed to do this!');
	}

	const id = crypto.randomUUID();
	const url = await getUploadUrl(id);

	return json({ url, method: 'PUT', id });
};
