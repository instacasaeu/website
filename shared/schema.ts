import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const homeModels = pgTable("home_models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  area: integer("area").notNull(), // in square meters
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // single-story, two-story, compact, luxury, eco, holiday
  features: text("features").array().notNull().default([]),
  basePrice: integer("base_price"), // optional base price
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  homeModel: text("home_model"),
  location: text("location"),
  homeSize: text("home_size"), // in square meters
  details: text("details"),
  status: text("status").notNull().default("pending"), // pending, contacted, quoted
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new, read, responded
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHomeModelSchema = createInsertSchema(homeModels).omit({
  id: true,
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type HomeModel = typeof homeModels.$inferSelect;
export type InsertHomeModel = z.infer<typeof insertHomeModelSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
