import { db } from "@/lib/db"
import { buyer } from "@/lib/db/schema"
import { NextResponse } from "next/server"
import Papa from 'papaparse';


export async function POST(req: Request) {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
        return NextResponse.json({ message: "No file" }, { status: 400 })
    }

    const text = await file.text()

    const { data, errors } = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
    })

    if (errors.length > 0) {
        return NextResponse.json({ message: errors }, { status: 400 })
    }

    // Insert into database
    const rows = data as BuyerType[]

    const cleanedRows = rows.map((row) =>
        Object.fromEntries(
            Object.entries(row).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
        )
    ) as CsvType[]

    for (const row of cleanedRows) {
        await db.insert(buyer).values({
            fullname: row.fullname,
            email: row.email,
            phone: row.phone,
            city: row.city as typeof buyer.$inferInsert["city"],
            property: row.property as typeof buyer.$inferInsert["property"],
            bhk: row.bhk as typeof buyer.$inferInsert["bhk"],
            purpose: row.purpose as typeof buyer.$inferInsert["purpose"],
            budgetMin: Number(row.budgetMin),
            budgetMax: Number(row.budgetMax),
            timeline: row.timeline as typeof buyer.$inferInsert["timeline"],
            source: row.source as typeof buyer.$inferInsert["source"],
            notes: row.notes,
            tags: row.tags ? row.tags.split(",").map(t => t.trim()) : [],
            status: row.status as typeof buyer.$inferInsert["status"],
        })
    }
    return NextResponse.json({ success: true, inserted: rows.length }, { status: 200 })
}