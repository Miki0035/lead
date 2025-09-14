"use client"
import { bhk, cities, propertyKinds, purposes, sources, timelines } from '@/constants'
import { leadCreateSchema } from '@/lib/validation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ZodError } from 'zod'



const Buyers = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    fullname: "",
    email: "",
    phone: 0,
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

  const [error, setError] = useState({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      leadCreateSchema.parse(formData);
      setError({})
    } catch (error) {
      if (error instanceof ZodError) {
        const errorObj = {};
        error.issues.forEach((issue) => {
          errorObj[issue.path[0]] = issue.message;
        })
        setError(errorObj)
      }
    }

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  return (
    <main className='relative w-full h-full'>
      <section>
        <button onClick={() => setShowModal(!showModal)}>
          Create Lead
        </button>
      </section>
      <form className='w-1/2 flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="fullname">Fullname</label>
          <input className='border-[0.5px] rounded-lg px-2 py-1' type="text" name='fullname' id='fullname' value={formData.fullname} onChange={handleChange} />
        </div>
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="email">Email</label>
          <input className='border-[0.5px] rounded-lg px-2 py-1' id='email' type="text" name='email' value={formData.email} onChange={handleChange} />
        </div>
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="phone">Phone</label>
          <input className='border-[0.5px] rounded-lg px-2 py-1' type="text" name='phone' id='phone' value={formData.phone} onChange={handleChange} />
        </div>

        {/* Cities */}

        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="city">City</label>
          <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.city} name="city" id="city">
            {
              cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))
            }
          </select>
        </div>

        {/* Properties */}
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="property">Property type</label>
          <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.property} name="property" id="property">
            {
              propertyKinds.map((property, index) => (
                <option key={index} value={property}>{property}</option>
              ))
            }
          </select>
        </div>

        {/* bhk */}
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="bhk">BHK</label>
          <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.bhk} name="bhk" id="bhk">
            {
              bhk.map((bhk, index) => (
                <option key={index} value={bhk}>{bhk}</option>
              ))
            }
          </select>
        </div>

        {/* purpose */}
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="purpose">Purpose</label>
          <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.purpose} name="purpose" id="purpose">
            {
              purposes.map((purpose, index) => (
                <option key={index} value={purpose}>{purpose}</option>
              ))
            }
          </select>
        </div>
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="budgetMin">Min Budget.</label>
          <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.budgetMin} type="number" name="budgetMin" id="budgetMin" />
        </div>

        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="budgetMax">Max Budget.</label>
          <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.budgetMax} type="number" name="budgetMax" id="budgetMax" />
        </div>

        {/* timeline */}
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="timeline">Timeline</label>
          <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.timeline} name="timeline" id="timeline">
            {
              timelines.map((timeline, index) => (
                <option key={index} value={timeline}>{timeline}</option>
              ))
            }
          </select>
        </div>

        {/* source */}
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="source">Source</label>
          <select onChange={handleChange} className='border-[0.5px] w-full' value={formData.source} name="source" id="source">
            {
              sources.map((source, index) => (
                <option key={index} value={source}>{source}</option>
              ))
            }
          </select>
        </div>

        {/* notes */}
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <textarea onChange={handleChange} name="notes" id="notes" placeholder="Notes..." cols={40} rows={5} maxLength={1000}></textarea>
        </div>
        <div className='flex flex-col items-start border-[0.5px] px-3 py-2'>
          <label htmlFor="tags">Tags</label>
          <input onChange={handleChange} className='border-[0.5px] rounded-lg px-2 py-1' value={formData.tags} type="text" name="tags" id="tags" />
        </div>
        <button type='submit' className='cursor-pointer bg-black px-5 py-2 text-white rounded-lg'> Create</button>
      </form>
    </main>
  )
}

export default Buyers