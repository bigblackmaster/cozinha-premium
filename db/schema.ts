import { boolean, integer, jsonb, numeric, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').default('').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  category: varchar('category', { length: 100 }).notNull(),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const combos = pgTable('combos', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').default('').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  items: jsonb('items').notNull().default([]),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }).notNull(),
  customerAddress: text('customer_address').notNull(),
  items: jsonb('items').notNull(),
  subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
  shipping: numeric('shipping', { precision: 10, scale: 2 }).notNull(),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).default('pendente').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const shippingRules = pgTable('shipping_rules', {
  id: serial('id').primaryKey(),
  minOrder: numeric('min_order', { precision: 10, scale: 2 }).default('0').notNull(),
  maxWeight: integer('max_weight'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  freeAbove: numeric('free_above', { precision: 10, scale: 2 }),
  active: boolean('active').default(true).notNull(),
})

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
