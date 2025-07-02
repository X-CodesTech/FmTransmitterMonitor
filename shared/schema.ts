import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const transmitterData = pgTable("transmitter_data", {
  id: serial("id").primaryKey(),
  forwardPower: real("forward_power").notNull(),
  reflectedPower: real("reflected_power").notNull(),
  frequency: real("frequency").notNull(),
  rfEfficiency: real("rf_efficiency").notNull(),
  targetPower: real("target_power").notNull(),
  isOnAir: boolean("is_on_air").notNull().default(false),
  timestamp: integer("timestamp").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTransmitterDataSchema = createInsertSchema(transmitterData).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TransmitterData = typeof transmitterData.$inferSelect;
export type InsertTransmitterData = z.infer<typeof insertTransmitterDataSchema>;
