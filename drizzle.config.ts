import { defineConfig } from "drizzle-kit"
import { config } from "dotenv";

config({ path: '.env.local'})

export default defineConfig({
    schema: "./lib/db/schema/index.ts",
    out: "./supabase/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})