import LeadForm from '@/components/LeadForm'
import { db } from '@/lib/db'
import { buyer } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const LeadDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [buyerData] = await db.select().from(buyer).where(eq(buyer.id, id))


  return (
    <main className='w-full h-full'>
      <section className='w-full h-full flex flex-col items-center my-12'>
        <div className='w-full  max-w-[720px] flex flex-col justify-center'>
          <Link href={"/buyers"} className='py-3 my-5 flex justify-center items-center w-15 h-15 bg-black border-[0.5px] rounded-full'>
            <ArrowLeft size={42}  color='#ffffff'/>
          </Link>
          <LeadForm data={buyerData} />
        </div>
      </section>
    </main>
  )
}

export default LeadDetail