import {
	PRIVATE_S3_KEY_ID,
	PRIVATE_S3_SECRET_KEY,
	PRIVATE_S3_URL_EXPIRE_TIME,
	PRIVATE_S3_ENDPOINT,
	PRIVATE_S3_REGION,
	PRIVATE_S3_BUCKET,
	PRIVATE_S3_PREFIX
} from '$env/static/private';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
	region: PRIVATE_S3_REGION,
	endpoint: PRIVATE_S3_ENDPOINT,
	credentials: {
		accessKeyId: PRIVATE_S3_KEY_ID,
		secretAccessKey: PRIVATE_S3_SECRET_KEY
	}
});

const expiresIn = parseInt(PRIVATE_S3_URL_EXPIRE_TIME);

async function getUploadUrl(id: string): Promise<string> {
	const url = await getSignedUrl(
		s3,
		new PutObjectCommand({
			Bucket: PRIVATE_S3_BUCKET,
			Key: PRIVATE_S3_PREFIX + id,
			ContentType: 'application/octet-stream'
		}),
		{ expiresIn }
	);

	return url;
}

async function getDownloadUrl(id: string, name: string): Promise<string> {
	const url = await getSignedUrl(
		s3,
		new GetObjectCommand({
			Bucket: PRIVATE_S3_BUCKET,
			Key: PRIVATE_S3_PREFIX + id,
			ResponseContentDisposition: `attachment; filename="${name}"`
		}),
		{ expiresIn }
	);

	return url;
}

export { getUploadUrl, getDownloadUrl };
