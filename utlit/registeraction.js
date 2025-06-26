"use server";
import supabase  from "./lib/connect_db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function registerAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role")

  if (!email || !password) {
    return {
      loading: false,
      message: "ข้อมูลไม่ครบ",
      success: false,
    };
  }

  const { data: existing, error: existingError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .limit(1);

    if(existingError){
      console.error(error);
      
    }

  if (existing.length > 0) {
    return {
      loading: false,
      message: "อีเมลนี้ถูกใช้ไปแล้ว",
      success: false,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

const { data: result, error } = await supabase
  .from("users")
  .insert([{ email, password: hashedPassword, role: "hr" }])
  .select()
  .single();

if (error) {
  console.error(error);
  return;
}

  const token = jwt.sign(
    { id: result.insertId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  await cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  const userId = result.insertId;
  redirect(`/profile/${userId}`);
}
