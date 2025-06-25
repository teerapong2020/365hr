'use client'
import { useActionState, useState } from 'react'
import { postCustomers } from '@/utlit/customeraction'

const initialState = {
  message: "",
  success: false,
}

export default function AddCustomer({ userData }) { 
  const [isOpen, setIsOpen] = useState(false)
  const [state, formAction] = useActionState(postCustomers, initialState)
//   console.log(userData.id);
  
  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleSubmit=()=>{
    setTimeout(()=>{
          alert("เพิ่มข้อมูลเรียบร้อย")
    window.location.reload()
    },300)
  }

  return (
    <>
      <button
        type='button'
        onClick={handleOpenModal}
        className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-black'
      >
        Add {userData.role == "hr"?"salesman":"customer"}
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-md shadow-lg max-w-md w-full mx-4'>
            <h2 className='text-xl font-bold mb-4'> Add {userData.role == "hr"?"salesman":"customer"}</h2>

            <form action={formAction}> 
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>Fullname</label>
                  <input
                    name='fullname' 
                    type='text'
                    required
                    className='border border-gray-300 rounded-md w-full p-2'
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium mb-2'>Lastname</label>
                  <input
                    name='lastname'
                    type='text'
                    required
                    className='border border-gray-300 rounded-md w-full p-2'
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium mb-2'>Email</label>
                  <input
                    name='email'
                    type='email'
                    required
                    className='border border-gray-300 rounded-md w-full p-2'
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium mb-2'>Phone</label>
                  <input
                    name='phone'
                    type='tel'
                    required
                    className='border border-gray-300 rounded-md w-full p-2'
                  />
                </div>
                <input
                type='hidden'
                name='created_by'
                value={userData.id}
                ></input>
              </div>
              
              <div className='flex justify-end space-x-2 mt-6'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button 
                  type='submit' 
                  onClick={handleSubmit}
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}