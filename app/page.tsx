import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='shadow-xl w-80 h-80  rounded-lg flex flex-col justify-center items-center gap-5'>
        <h1 className='text-lg'>Login as Demo Account</h1>
        <Link href={"/buyers"} className='border-[0.5px] rounded-lg py-3 px-5'>
          Login
        </Link>
      </div>

    </div>
  )
}

export default Home