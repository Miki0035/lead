import { db } from "@/lib/db"
import { buyer, buyerHistory } from "@/lib/db/schema"
import { getDiff } from "@/lib/utils"
import { eq, sql } from "drizzle-orm"
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


export async function PATCH(req: Request) {
    const body = await req.json()
    const { id, newEdit }: { id: string; newEdit: FormDataType } = body;
    const updatedObj: BuyerType = {
        ...newEdit,
        id,
        tags: newEdit?.tags?.split(",").map(tag => tag.trim()) || null
    }
    try {
        const oldRow = await db.select().from(buyer).where(eq(buyer.id, id))
        const diff = getDiff(oldRow[0], updatedObj)
        if (Object.keys(diff).length > 0) {
            await db.insert(buyerHistory).values({
                buyerId: id,
                changedBy: id, // who is updating
                changedAt: new Date(),
                diff: diff, // drizzle will store as JSON if your column is jsonb
            })
        }
        const updatedRow = await db.update(buyer).set({ ...updatedObj, updatedAt: new Date() }).where(eq(buyer.id, id)).returning()
        if (!updatedRow) return NextResponse.json({ message: "failed" }, { status: 500 })

        return NextResponse.json({ message: "success" }, { status: 200 })

        // await db.insert()
    } catch (error) {
        console.error(`error`, error)
        return NextResponse.json({ message: "failed" }, { status: 500 })
    }
}