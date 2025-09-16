import { db } from "@/lib/db"
import { buyer, buyerHistory } from "@/lib/db/schema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body: FormDataType = await req.json()
    const cleanedBody = {
        ...body,
        notes: body.notes === "" ? null : body.notes,
        tags: body.tags?.length === 0 ? null : body.tags?.split(","),
        bhk: body?.bhk?.length === 0 ? null : body.bhk,
    }
    try {
        const rowInBuyer = await db.insert(buyer).values(cleanedBody).returning();
        if (rowInBuyer.length > 0) {
            const buyer = rowInBuyer[0]
            await db.insert(buyerHistory).values({
                buyerId: buyer.id,
                changedBy: buyer.id,
            })
            return NextResponse.json({ message: "Lead has been created" }, { status: 200 })
        }
        return NextResponse.json({ message: `problem occured creating lead, please try again` }, { status: 500 })
    } catch (error) {
        console.error(`error creating lead`, error)
        return NextResponse.json({ message: `problem occured creating lead, please try again` })
    }
}