"use server";

import connection from "@/utlit/lib/connect_db";


//sale add customer
export async function postCustomers(prevState, formData) {
  const email = formData.get("email")
  const fullname = formData.get("fullname")
  const lastname = formData.get("lastname")
  const phone = formData.get("phone")
  const created_by = formData.get("create_by")

  // ตรวจสอบข้อมูล
  if (!email || !fullname || !lastname || !phone) {
    return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" }
  }

  try {
    // ตรวจสอบว่า email ซ้ำหรือไม่
    const [existingUser] = await connection.query(
      "SELECT id FROM customers WHERE email = ?",
      [email]
    )

    if (existingUser.length > 0) {
      return { success: false, message: "Email นี้มีผู้ใช้แล้ว" }
    }


    const [result] = await connection.query(
      "INSERT INTO customers (email, role, fullname, lastname, phone,created_by) VALUES (?, ?, ?, ?, ?, ?)", 
      [email, "salesman", fullname, lastname, phone,created_by]
    )

    if (result.insertId) {
      return { success: true, message: "เพิ่มผู้ใช้สำเร็จ" }
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, message: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้" }
  }
}

