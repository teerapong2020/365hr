"use server";
import connection from "./lib/connect_db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function registerAction(prevState,formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
     return {
        loading: false,
        message: "ข้อมูลไม่ครบ",
        success: false,
      };
  }

  const [existing] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  if (existing.length > 0) {
       return {
        loading: false,
        message: "อีเมลนี้ถูกใช้ไปแล้ว",
        success: false,
      };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await connection.query(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, hashedPassword, "hr"]
  );
  const userId = result.insertId;
    redirect(`/profile/${userId}`); 

}
