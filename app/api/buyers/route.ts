import { db } from "@/lib/db"
import { buyer } from "@/lib/db/schema"
import { sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const page = Number(searchParams.get("page") ?? 1)
        const limit = Number(searchParams.get("limit") ?? 10)
        const offset = (page - 1) * limit

        // total count 
        const [{ count }] = await db.select({ count: sql`count(*)` }).from(buyer)

        const response = await db.select().from(buyer).limit(limit).offset(offset)
        if (response.length > 0) {
            return NextResponse.json({
                data: response,
                pagination: { page, limit, total: Number(count), totalPages: Math.ceil(Number(count) / limit) }
            })
        }
        return NextResponse.json({ data: null })
    } catch (error) {
        console.error(`error getting uyer from database`, error)
        return NextResponse.json({ data: null }, { status: 500 })

    }
}