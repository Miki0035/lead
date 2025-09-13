import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-1/2 border-[0.5px] rounded-lg flex flex-col items-center'>
        <h1>Login as Demon User</h1>
        <Link href={"/buyers"} className='bg-black rounded-lg'>
          Login
        </Link>
      </div>

    </div>
  )
}

export default Home