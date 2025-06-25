'use client'
import { useState } from 'react'
import { deleteUserById,updateUserById } from '@/utlit/useraction'
import { useRouter } from 'next/navigation'

export default function SaleList({ sale }) {
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({})
  const router = useRouter()

  const handleEdit = (sale) => {
    setEditId(sale.id)
    setFormData({
      fullname: sale.fullname,
      lastname: sale.lastname,
      email: sale.email,
      phone: sale.phone,
    })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSave = async () => {
    await updateUserById(editId, formData)
    setEditId(null)
    router.refresh()
  }

  const handleDelete = async (id) => {
    await deleteUserById(id)
    router.refresh()
  }

  const handleCancel = () => {
    setEditId(null)
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-auto">
      {sale.length === 0 ? (
        <p>ยังไม่มี sale</p>
      ) : (
        sale.map((sale) => (
          <div key={sale.id} className="border p-3 rounded shadow">
            {editId === sale.id ? (
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
                <div>fullname: {sale.fullname} lastname: {sale.lastname} | email: {sale.email} | phone: {sale.phone}</div>
                <div className="mt-2 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(sale)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(sale.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}
