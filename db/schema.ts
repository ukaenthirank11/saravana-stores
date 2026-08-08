import { sql } from "drizzle-orm";
import { index, integer, primaryKey, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const createdAt = () => text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`);
const updatedAt = () => text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`);

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  phone: text("phone"),
  fullName: text("full_name").notNull(),
  authProvider: text("auth_provider").notNull().default("platform"),
  status: text("status").notNull().default("active"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [uniqueIndex("idx_users_email").on(table.email)]);

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  imageKey: text("image_key"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [uniqueIndex("idx_categories_slug").on(table.slug)]);

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").notNull().references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  sku: text("sku").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  stock: integer("stock").notNull().default(0),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  features: text("features", { mode: "json" }).$type<string[]>().notNull(),
  specifications: text("specifications", { mode: "json" }).$type<Record<string, string>>().notNull(),
  status: text("status").notNull().default("active"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("idx_products_slug").on(table.slug),
  uniqueIndex("idx_products_sku").on(table.sku),
  index("idx_products_category_status").on(table.categoryId, table.status),
]);

export const productImages = sqliteTable("product_images", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  objectKey: text("object_key").notNull(),
  altText: text("alt_text").notNull(),
  position: integer("position").notNull().default(0),
  createdAt: createdAt(),
}, (table) => [index("idx_product_images_product_position").on(table.productId, table.position)]);

export const wishlists = sqliteTable("wishlists", {
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: createdAt(),
}, (table) => [primaryKey({ columns: [table.userId, table.productId] })]);

export const cartItems = sqliteTable("cart_items", {
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  updatedAt: updatedAt(),
}, (table) => [primaryKey({ columns: [table.userId, table.productId] })]);

export const addresses = sqliteTable("addresses", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  label: text("label").notNull().default("Home"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  addressLine: text("address_line").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull().default("Malaysia"),
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [index("idx_addresses_user_default").on(table.userId, table.isDefault)]);

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  addressId: text("address_id").notNull().references(() => addresses.id),
  status: text("status").notNull().default("processing"),
  subtotal: real("subtotal").notNull(),
  shippingAmount: real("shipping_amount").notNull().default(0),
  discountAmount: real("discount_amount").notNull().default(0),
  total: real("total").notNull(),
  deliveryMethod: text("delivery_method").notNull(),
  courier: text("courier"),
  trackingNumber: text("tracking_number"),
  estimatedDelivery: text("estimated_delivery"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  index("idx_orders_user_created").on(table.userId, table.createdAt),
  index("idx_orders_open_status").on(table.status),
]);

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id),
  productName: text("product_name").notNull(),
  unitPrice: real("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
}, (table) => [index("idx_order_items_order").on(table.orderId)]);

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id),
  provider: text("provider").notNull(),
  providerReference: text("provider_reference"),
  amount: real("amount").notNull(),
  currency: text("currency").notNull().default("MYR"),
  status: text("status").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [uniqueIndex("idx_payments_order").on(table.orderId)]);

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id),
  rating: integer("rating").notNull(),
  title: text("title"),
  body: text("body"),
  isVerified: integer("is_verified", { mode: "boolean" }).notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [
  uniqueIndex("idx_reviews_product_user").on(table.productId, table.userId),
  index("idx_reviews_product_created").on(table.productId, table.createdAt),
]);

export const coupons = sqliteTable("coupons", {
  id: text("id").primaryKey(),
  code: text("code").notNull(),
  type: text("type").notNull(),
  value: real("value").notNull(),
  minOrderAmount: real("min_order_amount").notNull().default(0),
  startsAt: text("starts_at").notNull(),
  endsAt: text("ends_at").notNull(),
  usageLimit: integer("usage_limit"),
  usageCount: integer("usage_count").notNull().default(0),
  status: text("status").notNull().default("active"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => [uniqueIndex("idx_coupons_code").on(table.code)]);

export const adminUsers = sqliteTable("admin_users", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("catalog_manager"),
  createdAt: createdAt(),
});
