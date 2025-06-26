"use server";
import supabase from "@/utlit/lib/connect_db";

// sale add customer
export async function postCustomers(prevState, formData) {
  const email = formData.get("email");
  const fullname = formData.get("fullname");
  const lastname = formData.get("lastname");
  const phone = formData.get("phone");
  const created_by = formData.get("created_by");
  const profile = formData.get("profile");

  // ตรวจสอบข้อมูล
  if (!email || !fullname || !lastname || !phone) {
    return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    // ตรวจสอบว่า email ซ้ำหรือไม่
    const { data: existingUser, error: checkError } = await supabase
      .from("customers")
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

    // เพิ่มข้อมูลใหม่
    const { data: result, error: insertError } = await supabase
      .from("customers")
      .insert([
        {
          email,
          fullname,
          lastname,
          phone,
          profile,
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
export async function deleteSaleById(id) {
  try {
    const { error } = await supabase
      .from("customers")
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
export async function updateSaleById(id, data) {
  try {
    const { fullname, lastname, email, phone, profile } = data;
    
    const { error } = await supabase
      .from("customers")
      .update({
        fullname,
        lastname,
        email,
        phone,
        profile
      })
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