import { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_DATABASE_AUTH_TOKEN
	},
	out: './drizzle'
} satisfies Config;
