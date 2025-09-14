import * as z from "zod"


const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const leadCreateSchema = z.object({
    fullname: z.string().min(2, { error: "fullname must be more than 2 characters" }).max(80, { error: "fullname can't exceed 80 characters" }).nonempty({ error: "fullname can't be empty" }),
    email: z.email({ error: "must be vaild email" }).optional(),
    phone: z.string({ error: "phone must be a number" }).regex(phoneRegex).nonempty({ error: "phone number is required" }),
    city: z.string({ error: "city is required" }).nonempty({ error: "city is required" }),
    property: z.coerce.string({ error: "property type is required" }).nonempty({ error: "property is required" }),
    bhk: z.coerce.string().optional(),
    purpose: z.coerce.string({ error: "purpose is required" }).nonempty({ error: "purpose is required" }),
    budgetMin: z.coerce.number({ error: "min budget is required" }).positive({ error: "min budget must be greater than 0"}),
    budgetMax: z.coerce.number({ error: "max budget is required" }).positive({ error: "max budget must be greater than 0"}),
    timeline: z.coerce.string({ error: "timeline is required" }).nonempty({ error: "timeline is required" }),
    source: z.coerce.string({ error: "source is required" }).nonempty({ error: "source is required" }),
    notes: z.string().optional(),
    tags: z.array(z.string()).optional()
}).refine((data) => data.budgetMax >= data.budgetMin, {
    path: ["budgetMax"],
    error: "Max budget must be greater or equal to the Min budget"
}).refine((data) => {
    if (data.property === "Apartment" || data.property === "Villa") {
        return data.bhk && data.bhk.length > 0;
    }
    return true;
}, {
    path: ["bhk"],
    error: "BHK is required for apartments and villas"
})