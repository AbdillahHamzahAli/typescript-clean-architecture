import { pgTable, unique, serial, varchar, text, timestamp, integer, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	name: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	password: varchar({ length: 255 }).notNull(),
	role: integer().default(1).notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const posts = pgTable("posts", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	thumbnail: text().notNull(),
	authorId: integer("author_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "posts_author_id_users_id_fk"
		}),
	unique("posts_slug_unique").on(table.slug),
]);

export const roles = pgTable("roles", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("roles_name_unique").on(table.name),
]);
