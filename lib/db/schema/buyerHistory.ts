import { pgTable, uuid, timestamp, json } from "drizzle-orm/pg-core";
import { buyer } from "./buyer";

export const buyerHistory = pgTable("buyer_history", {
    id: uuid('id').primaryKey().defaultRandom(),
    buyerId: uuid("buyer_id")
        .notNull()
        .references(() => buyer.id, { onDelete: "cascade" }),
    changedBy: uuid("changed_by")
        .notNull()
        .references(() => buyer.id, { onDelete: "cascade" }),
    changedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    diff: json("diff").$type<Record<string, { old: unknown, new: unknown }>>(),
})