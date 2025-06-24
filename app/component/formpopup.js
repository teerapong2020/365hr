"use client";
import { useState } from "react";

export default function AddSalePopup({ isOpen, onClose, userRole }) {
  const [formData, setFormData] = useState({
    fullname: "",
    lastname: "",
    phone: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { fullname, lastname, phone, email, password } = formData;
    
    if (!fullname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
      setMessage("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      setMessageType("error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("กรุณากรอกอีเมลให้ถูกต้อง");
      setMessageType("error");
      return false;
    }

    if (password.length < 6) {
      setMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      setMessageType("error");
      return false;
    }

    if (phone && !/^[0-9]{10}$/.test(phone.replace(/-/g, ""))) {
      setMessage("กรุณากรอกเบอร์โทรให้ถูกต้อง (10 หลัก)");
      setMessageType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const response = await fetch('/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: userRole // ส่ง role ของผู้ที่เพิ่มข้อมูล
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "เพิ่มข้อมูลสำเร็จ!");
        setMessageType("success");
        
        // Reset form
        setFormData({
          fullname: "",
          lastname: "",
          phone: "",
          email: "",
          password: ""
        });
        
        // ปิด popup หลังจาก 2 วินาที
        setTimeout(() => {
          onClose();
          window.location.reload(); // Refresh หน้าเพื่อแสดงข้อมูลใหม่
        }, 2000);
        
      } else {
        setMessage(data.message || "เกิดข้อผิดพลาด");
        setMessageType("error");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullname: "",
      lastname: "",
      phone: "",
      email: "",
      password: ""
    });
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {userRole === 'hr' ? 'เพิ่มข้อมูล Sale' : 'เพิ่มข้อมูล Customer'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            disabled={loading}
          >
            ×
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded mb-4 ${
            messageType === "success" 
              ? "bg-green-100 text-green-700 border border-green-300" 
              : "bg-red-100 text-red-700 border border-red-300"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อ *</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">นามสกุล *</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">เบอร์โทร</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="0812345678"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">อีเมล *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">รหัสผ่าน *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
              minLength="6"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}