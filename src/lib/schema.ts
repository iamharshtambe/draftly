import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),

  name: varchar('name', { length: 255 }).notNull(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  emailVerified: boolean('email_verified').default(false),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: varchar('id', { length: 255 }).primaryKey(),

  userId: varchar('user_id', { length: 255 })
    .references(() => users.id)
    .notNull()
    .unique(), // one account per user (email/password only)

  passwordHash: text('password_hash').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 255 }).primaryKey(),

  userId: varchar('user_id', { length: 255 })
    .references(() => users.id)
    .notNull(), // removed .unique()

  token: varchar('token', { length: 255 }).notNull().unique(),

  expiresAt: timestamp('expires_at').notNull(),

  ipAddress: varchar('ip_address', { length: 255 }),

  userAgent: text('user_agent'),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),

  title: varchar('title', { length: 255 }).notNull(),

  description: varchar('description', { length: 255 }).notNull(),

  slug: varchar('slug', { length: 255 }).notNull().unique(),

  content: text('content').notNull(),

  authorId: varchar('author_id', { length: 255 })
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
