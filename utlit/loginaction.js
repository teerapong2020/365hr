"use server";
import supabase from "./lib/connect_db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      loading: false,
      message: "ข้อมูลไม่ครบ",
      success: false,
    };
  }

const { data: checkEmail, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .limit(1);

if (error) {
  console.error(error);
}
  if (checkEmail.length == 0) {
    return {
      loading: false,
      message: "ไม่มีอีเมลนี้ในระบบ",
      success: false,
    };
  }

  const user = checkEmail[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      loading: false,
      message: "รหัสผ่านไม่ถูกต้อง",
      success: false,
      user: null,
    };
  }

  if (user.isfirst == "true") {
    redirect(`/profile/${user.id}`);
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  // เก็บใน cookie
  await cookies().set("token", token, {
    httpOnly: true,
     secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  if (user.role === "hr") {
    redirect(`/hr/${user.id}`);
  } else if (user.role === "salesman") {
    redirect(`/sale/${user.id}`);
  } else {
    return {
      loading: false,
      message: "ไม่พบสิทธิ์เข้าใช้งาน",
      success: false,
    };
  }
}
