import * as z from "zod"

export const leadCreateSchema = z.object({
    fullname: z.string().min(2, { error: "fullname must be more than 2 characters" }).max(80, { error: "fullname can't exceed 80 characters" }).nonempty({ error: "fullname can't be empty" }),
    email: z.email(),
    phone: z.number({ error: "phone must be a number"}).min(10).max(15).nonnegative(),
    city: z.string(),
    propertyType: z.string(),
    bhk: z.string(),
    purpose: z.string(),
    budgetMin: z.number().nonnegative(),
    budgetMax: z.number().nonnegative(),
    timeline: z.string(),
    source: z.string(),
    notes: z.string(),
    tags: z.array(z.string())
})