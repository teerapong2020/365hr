"use server";
import connection from "@/lib/connect_db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
export async function loginAction(prevState,formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
     return {
        loading: false,
        message: "ข้อมูลไม่ครบ",
        success: false,
      };
  }

  const [checkEmail] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  if (checkEmail.length == 0) {
       return {
        loading: false,
        message: "ไม่มีอีเมลนี้ในระบบ",
        success: false,
      };
  }

  const user = checkEmail[0]
  const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return {
        loading: false,
        message: "รหัสผ่านไม่ถูกต้อง",
        success: false,
        user: null,
      };
    }

    redirect("/profile");
}
