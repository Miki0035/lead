"use client"

import { bhk, cities, propertyKinds, purposes, sources, timelines } from "@/constants"
import { leadCreateSchema } from "@/lib/validation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ZodError } from "zod"

const LeadForm = ({ data }: { data: BuyerType | null }) => {


    const [formData, setFormData] = useState<FormDataType>({
        fullname: "",
        email: "",
        phone: "",
        city: "" as City,
        property: "" as PropertyType,
        bhk: "" as BHKType,
        purpose: "" as PurposeType,
        budgetMin: 0,
        budgetMax: 0,
        timeline: "" as TimelineType,
        source: "" as SourceType,
        notes: "",
        tags: [],
    })


    useEffect(() => {
        if (data) {
            setFormData({
                fullname: data.fullname,
                email: data.email,
                phone: data.phone,
                city: data.city as City,
                property: data.property as PropertyType,
                bhk: data.bhk as BHKType,
                purpose: data.purpose as PurposeType,
                budgetMin: data.budgetMin,
                budgetMax: data.budgetMax,
                timeline: data.timeline as TimelineType,
                source: data.source as SourceType,
                notes: data.notes ?? "",
                tags: data.tags ?? [],
            })
        }

    }, [data])

    const [error, setError] = useState<Partial<Record<keyof FormDataType, string>>>({})

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            leadCreateSchema.parse(formData);
            setError({})
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/buyers/new`, {
                method: "POST",
                body: JSON.stringify(formData)
            });
            console.log(`response`, response)
        } catch (error) {
            if (error instanceof ZodError) {
                const errorObj: ErrorState<FormDataType> = {};

                error.issues.forEach((issue) => {
                    console.log(`error message:`, issue)
                    const field = issue.path[0] as keyof FormDataType;
                    errorObj[field] = issue.message;
                })
                setError(errorObj)
            }
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleEdit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            leadCreateSchema.parse(formData);
            setError({})
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/buyers`, {
                method: "PATCH",
                body: JSON.stringify({
                    id: data?.id,
                    newEdit: formData
                }),
            });
            console.log(`response`, response)
        } catch (error) {
            if (error instanceof ZodError) {
                const errorObj: ErrorState<FormDataType> = {};

                error.issues.forEach((issue) => {
                    console.log(`error message:`, issue)
                    const field = issue.path[0] as keyof FormDataType;
                    errorObj[field] = issue.message;
                })
                setError(errorObj)
            }
        }
    }

    if (data)
        return (
            <form className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ' onSubmit={handleEdit}>
                <div>
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="fullname">Fullname</label>
                        <input className='border-[0.5px] rounded-lg px-2 py-1' type="text" name='fullname' id='fullname' value={formData.fullname} onChange={handleChange} />
                        {
                            error.fullname && (<span className='text-red-500 capitalize py-1'> {error.fullname}</span>)
                        }
                    </div>
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="email">Email</label>
                        <input className='border-[0.5px] rounded-lg px-2 py-1' id='email' type="text" name='email' value={formData.email} onChange={handleChange} />
                        {
                            error.email && (<span className='text-red-500 capitalize py-1'> {error.email}</span>)
                        }
                    </div>
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="phone">Phone</label>
                        <input className='border-[0.5px] rounded-lg px-2 py-1' type="tel" name='phone' id='phone' value={formData.phone} onChange={handleChange} />
                        {
                            error.phone && (<span className='text-red-500 capitalize py-1'> {error.phone}</span>)
                        }
                    </div>

                    {/* Cities */}

                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="city">City</label>
                        <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.city} name="city" id="city">
                            <option value="">Select your city</option>
                            {
                                cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))
                            }
                        </select>
                        {
                            error.city && (<span className='text-red-500 capitalize py-1'> {error.city}</span>)
                        }
                    </div>

                    {/* Properties */}
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="property">Property type</label>
                        <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.property} name="property" id="property">
                            <option value={""}>Select a property type</option>

                            {
                                propertyKinds.map((property, index) => (
                                    <option key={index} value={property}>{property}</option>
                                ))
                            }
                        </select>
                        {
                            error.property && (<span className='text-red-500 capitalize py-1'> {error.property}</span>)
                        }
                    </div>

                    {/* bhk */}
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="bhk">BHK</label>

                        <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.bhk ?? ""} name="bhk" id="bhk">
                            <option value={""}>Select BHK </option>

                            {
                                bhk.map((bhk, index) => (
                                    <option key={index} value={bhk}>{bhk}</option>
                                ))
                            }
                        </select>
                        {
                            error.bhk && (<span className='text-red-500 capitalize py-1'> {error.bhk}</span>)
                        }
                    </div>
                </div>
                {/* purpose */}
                <div>

                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="purpose">Purpose</label>

                        <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.purpose} name="purpose" id="purpose">
                            <option value={""}>Select purpose </option>
                            {
                                purposes.map((purpose, index) => (
                                    <option key={index} value={purpose}>{purpose}</option>
                                ))
                            }
                        </select>
                        {
                            error.purpose && (<span className='text-red-500 capitalize py-1'> {error.purpose}</span>)
                        }
                    </div>
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="budgetMin">Min Budget.</label>
                        <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.budgetMin ?? ""} type="number" name="budgetMin" id="budgetMin" />
                        {
                            error.budgetMin && (<span className='text-red-500 capitalize py-1'> {error.budgetMin}</span>)
                        }
                    </div>

                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="budgetMax">Max Budget.</label>
                        <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.budgetMax ?? ""} type="number" name="budgetMax" id="budgetMax" />
                        {
                            error.budgetMax && (<span className='text-red-500 capitalize py-1'> {error.budgetMax}</span>)
                        }
                    </div>

                    {/* timeline */}
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="timeline">Timeline</label>
                        <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.timeline ?? ""} name="timeline" id="timeline">
                            <option value={""}>Select a timeline</option>
                            {
                                timelines.map((timeline, index) => (
                                    <option key={index} value={timeline}>{timeline}</option>
                                ))
                            }
                        </select>
                        {
                            error.timeline && (<span className='text-red-500 capitalize py-1'> {error.timeline}</span>)
                        }
                    </div>

                    {/* source */}
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="source">Source</label>
                        <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.source ?? ""} name="source" id="source">
                            <option value={""}>Select source </option>
                            {
                                sources.map((source, index) => (
                                    <option key={index} value={source}>{source}</option>
                                ))
                            }
                        </select>
                        {
                            error.source && (<span className='text-red-500 capitalize py-1'> {error.source}</span>)
                        }
                    </div>

                    {/* notes */}
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <textarea onChange={handleChange} name="notes" id="notes" placeholder="Notes..." cols={40} rows={5} maxLength={1000}></textarea>
                        {
                            error.notes && (<span className='text-red-500 capitalize py-1'> {error.notes}</span>)
                        }
                    </div>
                    <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                        <label htmlFor="tags">Tags</label>
                        <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.tags ?? ""} type="text" name="tags" id="tags" />
                        {
                            error.tags && (<span className='text-red-500 capitalize py-1'> {error.tags}</span>)
                        }
                    </div>
                </div>
                <button type='submit' className='cursor-pointer bg-black  px-5 py-2 text-white rounded-lg'> Edit</button>
            </form>
        )

    return (

        <form className='w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ' onSubmit={handleSubmit}>
            <div>
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="fullname">Fullname</label>
                    <input className='border-[0.5px] rounded-lg px-2 py-1' type="text" name='fullname' id='fullname' value={formData.fullname} onChange={handleChange} />
                    {
                        error.fullname && (<span className='text-red-500 capitalize py-1'> {error.fullname}</span>)
                    }
                </div>
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="email">Email</label>
                    <input className='border-[0.5px] rounded-lg px-2 py-1' id='email' type="text" name='email' value={formData.email} onChange={handleChange} />
                    {
                        error.email && (<span className='text-red-500 capitalize py-1'> {error.email}</span>)
                    }
                </div>
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="phone">Phone</label>
                    <input className='border-[0.5px] rounded-lg px-2 py-1' type="tel" name='phone' id='phone' value={formData.phone} onChange={handleChange} />
                    {
                        error.phone && (<span className='text-red-500 capitalize py-1'> {error.phone}</span>)
                    }
                </div>

                {/* Cities */}

                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="city">City</label>
                    <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.city} name="city" id="city">
                        <option value="">Select your city</option>
                        {
                            cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))
                        }
                    </select>
                    {
                        error.city && (<span className='text-red-500 capitalize py-1'> {error.city}</span>)
                    }
                </div>

                {/* Properties */}
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="property">Property type</label>
                    <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.property} name="property" id="property">
                        <option value={""}>Select a property type</option>

                        {
                            propertyKinds.map((property, index) => (
                                <option key={index} value={property}>{property}</option>
                            ))
                        }
                    </select>
                    {
                        error.property && (<span className='text-red-500 capitalize py-1'> {error.property}</span>)
                    }
                </div>

                {/* bhk */}
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="bhk">BHK</label>

                    <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.bhk ?? ""} name="bhk" id="bhk">
                        <option value={""}>Select BHK </option>

                        {
                            bhk.map((bhk, index) => (
                                <option key={index} value={bhk}>{bhk}</option>
                            ))
                        }
                    </select>
                    {
                        error.bhk && (<span className='text-red-500 capitalize py-1'> {error.bhk}</span>)
                    }
                </div>
            </div>
            {/* purpose */}
            <div>

                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="purpose">Purpose</label>

                    <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.purpose} name="purpose" id="purpose">
                        <option value={""}>Select purpose </option>
                        {
                            purposes.map((purpose, index) => (
                                <option key={index} value={purpose}>{purpose}</option>
                            ))
                        }
                    </select>
                    {
                        error.purpose && (<span className='text-red-500 capitalize py-1'> {error.purpose}</span>)
                    }
                </div>
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="budgetMin">Min Budget.</label>
                    <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.budgetMin ?? ""} type="number" name="budgetMin" id="budgetMin" />
                    {
                        error.budgetMin && (<span className='text-red-500 capitalize py-1'> {error.budgetMin}</span>)
                    }
                </div>

                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="budgetMax">Max Budget.</label>
                    <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.budgetMax ?? ""} type="number" name="budgetMax" id="budgetMax" />
                    {
                        error.budgetMax && (<span className='text-red-500 capitalize py-1'> {error.budgetMax}</span>)
                    }
                </div>

                {/* timeline */}
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="timeline">Timeline</label>
                    <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.timeline ?? ""} name="timeline" id="timeline">
                        <option value={""}>Select a timeline</option>
                        {
                            timelines.map((timeline, index) => (
                                <option key={index} value={timeline}>{timeline}</option>
                            ))
                        }
                    </select>
                    {
                        error.timeline && (<span className='text-red-500 capitalize py-1'> {error.timeline}</span>)
                    }
                </div>

                {/* source */}
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="source">Source</label>
                    <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.source ?? ""} name="source" id="source">
                        <option value={""}>Select source </option>
                        {
                            sources.map((source, index) => (
                                <option key={index} value={source}>{source}</option>
                            ))
                        }
                    </select>
                    {
                        error.source && (<span className='text-red-500 capitalize py-1'> {error.source}</span>)
                    }
                </div>

                {/* notes */}
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <textarea onChange={handleChange} name="notes" id="notes" placeholder="Notes..." cols={40} rows={5} maxLength={1000}></textarea>
                    {
                        error.notes && (<span className='text-red-500 capitalize py-1'> {error.notes}</span>)
                    }
                </div>
                <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
                    <label htmlFor="tags">Tags</label>
                    <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.tags} type="text" name="tags" id="tags" />
                    {
                        error.tags && (<span className='text-red-500 capitalize py-1'> {error.tags}</span>)
                    }
                </div>
            </div>
            <button type='submit' className='cursor-pointer  bg-black  px-5 py-2 text-white rounded-lg'> Create</button>
        </form>
    )
}

export default LeadForm