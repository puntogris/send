import {
	PRIVATE_S3_KEY_ID,
	PRIVATE_S3_SECRET_KEY,
	PRIVATE_S3_URL_EXPIRE_TIME,
	PRIVATE_S3_ENDPOINT,
	PRIVATE_S3_REGION
} from '$env/static/private';
import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
	region: PRIVATE_S3_REGION,
	endpoint: PRIVATE_S3_ENDPOINT,
	credentials: {
		accessKeyId: PRIVATE_S3_KEY_ID,
		secretAccessKey: PRIVATE_S3_SECRET_KEY
	}
});

export const expiresIn = parseInt(PRIVATE_S3_URL_EXPIRE_TIME);
