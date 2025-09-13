import { AnyPgColumn, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const cityEnum = pgEnum('city', ['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other'])
export const propertyTypeEnum = pgEnum('property', ['Apartment', 'Villa', 'Plot', 'Office', 'Retail'])
export const bhkEnum = pgEnum('bhk', ['1', '2', '3', '4', 'Studio'])
export const purposeEnum = pgEnum('purpose', ['Buy', 'Rent'])
export const timelineEnum = pgEnum('timeline', ['0-3m', '3-6m', '>6m', 'Exploring'])
export const sourceEnum = pgEnum('source', ['Website', 'Referral', 'Walk-in', 'Call', 'Other'])
export const statusEnum = pgEnum('status', ['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped'])


export const buyer = pgTable("buyer", {
    id: uuid("id").primaryKey(),
    fullName: varchar('full_name', { length: 80 }).notNull(),
    email: text('email'),
    phone: varchar('phone', { length: 15 }).notNull(),
    city: cityEnum('city').notNull(),
    property: propertyTypeEnum('property').notNull(),
    bhk: bhkEnum('bhk'),
    purpose: purposeEnum('purpose').notNull(),
    budgetMin: integer(),
    budgetMax: integer(),
    timeline: timelineEnum('timeline'),
    source: sourceEnum('source'),
    status: statusEnum('status').default("New"),
    notes: varchar('notes', { length: 1000 }),
    tags: text('tags').array(),
    ownerId: uuid('owner_id').references((): AnyPgColumn => buyer.id, {
        onDelete: "set null"
    }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

