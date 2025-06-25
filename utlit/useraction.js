"use server";

import connection from "@/utlit/lib/connect_db";
import bcrypt from "bcrypt";

export async function updateUser(id, data) {
  try {
    const { fullname, lastname, phone, profile, isfirst } = data;

    const [existingUser] = await connection.query(
      "SELECT id FROM users WHERE id = ?",
      [id]
    );
    if (existingUser.length === 0) {
      return { success: false, message: "ไม่พบผู้ใช้" };
    }

    await connection.query(
      "UPDATE users SET fullname = ?, lastname = ?, phone = ?, profile = ?,isfirst = ? WHERE id = ?",
      [fullname, lastname, phone, profile, isfirst, id]
    );

    return { success: true, message: "อัปเดตสำเร็จ" };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, message: "อัปเดตไม่สำเร็จ" };
  }
}

//hr add sale
export async function postUserById(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const fullname = formData.get("fullname");
  const lastname = formData.get("lastname");
  const phone = formData.get("phone");
  const created_by = formData.get("create_by");

  // ตรวจสอบข้อมูล
  if (!email || !password || !fullname || !lastname || !phone) {
    return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "รหัสผ่านไม่ตรงกัน" };
  }

  try {
    // ตรวจสอบว่า email ซ้ำหรือไม่
    const [existingUser] = await connection.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return { success: false, message: "Email นี้มีผู้ใช้แล้ว" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
      "INSERT INTO users (email, password, role, fullname, lastname, phone,created_by) VALUES (?, ?, ?, ?, ?, ?,?)",
      [email, hashedPassword, "salesman", fullname, lastname, phone, created_by]
    );

    if (result.insertId) {
      return { success: true, message: "เพิ่มผู้ใช้สำเร็จ" };
    }
     return { success: true, message: "เพิ่มผู้ใช้สำเร็จ" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้" };
  }
}

// delete by id 
export async function deleteUserById(id) {
  try {
    await connection.query("DELETE FROM users WHERE id = ?", [id]);
    return { success: true, message: "ลบสำเร็จ" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "ลบไม่สำเร็จ" };
  }
}

// แก้ไข Sales โดย id
export async function updateUserById(id, data) {
  try {
    const { fullname, lastname, email, phone,profile,password } = data;
    await connection.query(
      "UPDATE users SET fullname = ?, lastname = ?, email = ?, phone=?,profile =?,password=? WHERE id = ?",
      [fullname, lastname, email, phone,profile,password, id]
    );
    return { success: true, message: "แก้ไขสำเร็จ" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "แก้ไขไม่สำเร็จ" };
  }
}
