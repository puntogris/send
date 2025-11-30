# send

A temporal storage app for personal use, highly inspired by Firefox Send.

## Dev

### Used

This project is currently configured with the following services. You can adapt them to your specific requirements.

Host: [Vercel](https://vercel.com/)

Storage: [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/)

Database: SQLite with [Turso](https://github.com/tursoapp/turso)

### Env variables

| Environment Variable         | Description                                                     |
| :--------------------------- | :-------------------------------------------------------------- |
| `PRIVATE_S3_ENDPOINT`        | The URL endpoint for the S3-compatible service.                 |
| `PRIVATE_S3_KEY_ID`          | The access key ID used to authenticate with the S3 service.     |
| `PRIVATE_S3_SECRET_KEY`      | The secret access key used to authenticate with the S3 service. |
| `PRIVATE_S3_BUCKET`          | The name of the specific S3 bucket where files are stored.      |
| `PRIVATE_S3_REGION`          | The geographical region where the S3 bucket is hosted.          |
| `PRIVATE_S3_URL_EXPIRE_TIME` | The duration (in seconds) before signed S3 URLs expire.         |
| `PRIVATE_S3_PREFIX`          | A path or folder prefix to organize files within the bucket.    |
| `PRIVATE_AUTH_PASSWORD`      | The password required to access the app.                        |
| `TURSO_DATABASE_AUTH_TOKEN`  | The authentication token for connecting to the Turso database.  |
| `TURSO_DATABASE_URL`         | The connection string/URL for the Turso database.               |

## Screenshots

### Upload your files

![Upload](screenshots/1.webp)

### Get the link

![Get link](screenshots/2.webp)

### Download the files

![Download](screenshots/3.webp)

## TODO

### Temp TODO's

- [x] Simple auth(local env)
- [x] Remote DB to persist links
- [ ] File encryption
- [x] An s3 compatible storage provider
- [x] Page to see generated links

### Future TODO's

- [ ] Mobile app for Android and iOS
- [ ] Migrate to something like Appwrite/Supabase for mobile compatibility and have auth and a DB built in or create an api for all theses features
- [ ] Dark mode
- [ ] Multipart upload
