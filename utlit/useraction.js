"use server";

import supabase from "@/utlit/lib/connect_db";
import bcrypt from "bcrypt";

export async function updateUser(id, data) {
  try {
    const { fullname, lastname, phone, profile, isfirst } = data;

    // ตรวจสอบว่าผู้ใช้มีอยู่จริง
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("id", id)
      .limit(1);

    if (checkError) {
      console.error("Error checking user:", checkError);
      return { success: false, message: "เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้" };
    }

    if (!existingUser || existingUser.length === 0) {
      return { success: false, message: "ไม่พบผู้ใช้" };
    }

    // อัปเดตข้อมูลผู้ใช้
    const { error: updateError } = await supabase
      .from("users")
      .update({
        fullname,
        lastname,
        phone,
        profile,
        isfirst
      })
      .eq("id", id);

    if (updateError) {
      console.error("Update error:", updateError);
      return { success: false, message: "อัปเดตไม่สำเร็จ" };
    }

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
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (checkError) {
      console.error("Error checking existing user:", checkError);
      return { success: false, message: "เกิดข้อผิดพลาดในการตรวจสอบข้อมูล" };
    }

    if (existingUser && existingUser.length > 0) {
      return { success: false, message: "Email นี้มีผู้ใช้แล้ว" };
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่มผู้ใช้ใหม่
    const { data: result, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          email,
          password: hashedPassword,
          role: "salesman",
          fullname,
          lastname,
          phone,
          created_by
        }
      ])
      .select();

    if (insertError) {
      console.error("Error creating user:", insertError);
      return { success: false, message: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้" };
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
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return { success: false, message: "ลบไม่สำเร็จ" };
    }

    return { success: true, message: "ลบสำเร็จ" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "ลบไม่สำเร็จ" };
  }
}

// แก้ไข Sales โดย id
export async function updateUserById(id, data) {
  try {
    const { fullname, lastname, email, phone, profile, password } = data;
    
    // เตรียมข้อมูลสำหรับอัปเดต
    const updateData = {
      fullname,
      lastname,
      email,
      phone,
      profile
    };

    // ถ้ามี password ใหม่ ให้เข้ารหัสก่อน
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const { error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      return { success: false, message: "แก้ไขไม่สำเร็จ" };
    }

    return { success: true, message: "แก้ไขสำเร็จ" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "แก้ไขไม่สำเร็จ" };
  }
}