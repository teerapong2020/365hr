// /app/component/customerlist.jsx
'use client'

import { useState } from 'react'
import { deleteSaleById, updateSaleById } from '@/utlit/customeraction'
import { useRouter } from 'next/navigation'

export default function CustomerList({ customers }) {
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({})
  const router = useRouter()

  const handleEdit = (customers) => {
    setEditId(customers.id)
    setFormData({
      fullname: customers.fullname,
      lastname: customers.lastname,
      email: customers.email,
      phone: customers.phone
    })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async () => {
    await updateSaleById(editId, formData)
    setEditId(null)
    router.refresh()
  }

  const handleDelete = async (id) => {
    await deleteSaleById(id)
    router.refresh()
  }

  const handleCancel = () => {
    setEditId(null)
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-auto">
      {customers.length === 0 ? (
        <p>ยังไม่มี customer</p>
      ) : (
        customers.map((customer) => (
          <div key={customer.id} className="border p-3 rounded shadow ">
            {editId === customer.id ? (
              <>
              <label>fullname</label>
                <input name="fullname" value={formData.fullname} onChange={handleChange} className="border p-1 mr-2" />
                  <label>lastname</label>
                <input name="lastname" value={formData.lastname} onChange={handleChange} className="border p-1 mr-2" />
                  <label>email</label>
                <input name="email" value={formData.email} onChange={handleChange} className="border p-1 mr-2" />
                  <label>phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} className="border p-1 mr-2" />
                <div className="mt-2 space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                  <button className="bg-gray-300 px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div>fullname: {customer.fullname} lastname: {customer.lastname} | email: {customer.email} | phone: {customer.phone}</div>
                <div className="mt-2 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(customer)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(customer.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}
