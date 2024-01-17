import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const filesSchema = {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	size: integer('size').notNull(),
	upload: text('upload').notNull()
};

export const uploadSchema = {
	id: text('id').primaryKey().default(crypto.randomUUID()),
	expireAt: integer('expire_at', { mode: 'timestamp' }).notNull(),
	expireDownloads: integer('expire_downloads').notNull()
};

export const files = sqliteTable('files', filesSchema);

export const uploads = sqliteTable('upload', uploadSchema);

export type SendFile = typeof files.$inferSelect;

export type Upload = typeof uploads.$inferSelect;
