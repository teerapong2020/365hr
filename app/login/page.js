"use client";
import { useState } from "react";
import { loginAction } from "@/utlit/loginaction";
import { useActionState } from "react";
import Link from "next/link";

const initState = {
  // แก้ไข initSate เป็น initState
  loading: false,
  message: "",
  success: false,
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(loginAction, initState);

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAction = (formData) => {
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    if (!emailValue || !passwordValue) {
      alert("❗ กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (!emailFormat.test(emailValue)) {
      alert("❗ กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }

    formAction(formData);
  };

  return (
    <>
      <div></div>
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form action={handleAction} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending} // ปิดใช้งานตอน loading
            className="border p-2 rounded w-full disabled:opacity-50"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isPending}
            className="border p-2 rounded w-full disabled:opacity-50"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "กำลังเข้าสู่ระบบ..." : "login"}
        </button>
      </form>
      <Link href="/register">
        <button className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition-colors text-center mt-4">
          Register
        </button>
      </Link>
    </>
  );
}
