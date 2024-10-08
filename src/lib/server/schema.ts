import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const filesSchema = {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	size: integer('size').notNull(),
	upload: text('upload').notNull(),
	downloads: integer('downloads').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
};

export const uploadSchema = {
	id: text('id').primaryKey().default(nanoid(4)),
	expireAt: integer('expire_at', { mode: 'timestamp' }).notNull(),
	expireDownloads: integer('expire_downloads').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	fileNames: text('filesName').notNull().default('[]')
};

export const files = sqliteTable('files', filesSchema);
export const uploads = sqliteTable('upload', uploadSchema);

export type SendFile = typeof files.$inferSelect;
export type Upload = typeof uploads.$inferSelect;
