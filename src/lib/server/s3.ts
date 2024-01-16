import {
	STORAGE_ACCESS_KEY_ID,
	STORAGE_ENDPOINT,
	STORAGE_SECRET_ACCESS_KEY
} from '$env/static/private';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const STORAGE_BUCKET = 'send';
const STORAGE_REGION = 'global';
const URL_EXPIRATION_IN_SECONDS = 600;

const s3 = new S3Client({
	region: STORAGE_REGION,
	endpoint: STORAGE_ENDPOINT,
	credentials: {
		accessKeyId: STORAGE_ACCESS_KEY_ID,
		secretAccessKey: STORAGE_SECRET_ACCESS_KEY
	}
});

export async function createDownloadSignedUrl(vaultId: string) {
	const command = new GetObjectCommand({
		Bucket: STORAGE_BUCKET,
		Key: vaultId
	});

	const signedUrl = await getSignedUrl(s3, command, {
		expiresIn: URL_EXPIRATION_IN_SECONDS
	});
	return signedUrl;
}

export async function createUploadSignedUrl(vaultId: string) {
	const command = new PutObjectCommand({
		Bucket: STORAGE_BUCKET,
		Key: vaultId
	});

	const signedUrl = await getSignedUrl(s3, command, {
		expiresIn: URL_EXPIRATION_IN_SECONDS
	});
	return signedUrl;
}
