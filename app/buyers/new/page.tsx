import LeadForm from '@/components/LeadForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BuyerNew = () => {
    return (
        <main className='w-full h-full'>
            <section className='w-full h-full flex flex-col items-center my-12'>
                <div className='w-full  max-w-[720px] flex flex-col justify-center'>

                    <Link href={"/buyers"} className='py-3 my-5 flex justify-center items-center w-15 h-15 bg-black border-[0.5px] rounded-full'>
                        <ArrowLeft size={42} color='#ffffff' />
                    </Link>
                    <LeadForm data={null} />
                </div>
            </section>

        </main>
    )
}

export default BuyerNew