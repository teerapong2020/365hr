"use server";

import connection from "@/utlit/lib/connect_db";


//sale add customer
export async function postCustomers(prevState, formData) {
  const email = formData.get("email")
  const fullname = formData.get("fullname")
  const lastname = formData.get("lastname")
  const phone = formData.get("phone")
  const created_by = formData.get("created_by")
  const profile = formData.get("profile")

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
      "INSERT INTO customers (email, fullname, lastname, phone,profile,created_by) VALUES (?, ?, ?, ?, ?, ?)", 
      [email, fullname, lastname, phone,profile,created_by]
    )

    if (result.insertId) {
      return { success: true, message: "เพิ่มผู้ใช้สำเร็จ" }
    }
     return { success: true, message: "เพิ่มผู้ใช้สำเร็จ" };
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, message: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้" }
  }
}


// delete by id 
export async function deleteSaleById(id) {
  try {
    await connection.query("DELETE FROM customers WHERE id = ?", [id]);
    return { success: true, message: "ลบสำเร็จ" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "ลบไม่สำเร็จ" };
  }
}

// แก้ไข Sales โดย id
export async function updateSaleById(id, data) {
  try {
    const { fullname, lastname, email, phone,profile } = data;
    await connection.query(
      "UPDATE customers SET fullname = ?, lastname = ?, email = ?, phone=?,profile =? WHERE id = ?",
      [fullname, lastname, email, phone,profile, id]
    );
    return { success: true, message: "แก้ไขสำเร็จ" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "แก้ไขไม่สำเร็จ" };
  }
}

