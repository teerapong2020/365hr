import Link from 'next/link'
import React from 'react'

export default  function Navbar() {
  
  return (
    <div>
        <div className='w-full bg-black p-4'>
           <Link href={"/"} className='text-2xl font-bold text-white'>
           365HR
           </Link>
        </div>
    </div>
  )
}
