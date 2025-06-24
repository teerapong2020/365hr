'use client'

import { useState } from 'react'

export default function AddSale() {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddSale = () => {
    setIsOpen(true)
  }

  return (
    <>
      <button
        type='button'
        onClick={handleAddSale}
        className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
      >
        Add sale
      </button>

      {isOpen && (
        <div className='fixed inset-0  bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-md shadow-lg'>
            <h2 className='text-xl font-bold mb-4'>Add Sale</h2>
            <form>
              <div className='mb-4'>
                <label className='block text-sm font-medium mb-2'>fullname</label>
                <input
                  type='text'
                  className='border border-gray-300 rounded-md w-full p-2'
                />
                  <label className='block text-sm font-medium mb-2'>lastname</label>
                <input
                  type='text'
                  className='border border-gray-300 rounded-md w-full p-2'
                />
                  <label className='block text-sm font-medium mb-2'>email</label>
                <input
                  type='email'
                  className='border border-gray-300 rounded-md w-full p-2'
                />
                     <label className='block text-sm font-medium mb-2'>phone</label>
                <input
                  type='number'
                  className='border border-gray-300 rounded-md w-full p-2'
                />
                     <label className='block text-sm font-medium mb-2'>password</label>
                <input
                  type='password'
                  className='border border-gray-300 rounded-md w-full p-2'
                />
                             <label className='block text-sm font-medium mb-2'>Confirm password</label>
                <input
                  type='password'
                  className='border border-gray-300 rounded-md w-full p-2'
                />
              </div>
              <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                Submit
              </button>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='ml-2 bg-gray-300 px-4 py-2 rounded-md'
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
