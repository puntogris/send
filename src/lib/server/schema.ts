import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const schema = {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	size: integer('size').notNull(),
	extension: text('extension').notNull(),
	url: text('url').notNull(),
	downloads: integer('dowloads').default(0).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
};

export const sendFiles = sqliteTable('files', schema);

export type SendFile = typeof sendFiles.$inferSelect;
