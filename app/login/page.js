"use client";
import { useState, useEffect } from "react";
import { loginAction } from "@/utlit/loginaction";
import { useActionState } from "react";
import Link from "next/link";

const initState = {
  loading: false,
  message: "",
  success: false,
};

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(loginAction, initState);

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state.message]);

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAction = (formData) => {
    const emailValue = formData.get("email");
    if (!emailFormat.test(emailValue)) {
      alert("❗ กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }
    formAction(formData);
    setTimeout(() => {
      if (state.message) {
        alert(state.message);
      }
    }, 100);
  };

  return (
    <div className="flex justify-center w-screen ">
      <form action={handleAction} className="space-y-4 w-1/3 max-md:w-full m-8">
         <img src="/logo.png"  className=" rounded-full w-1/2 mx-auto"></img>
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
          className="bg-blue-500 text-white p-2 rounded hover:bg-black transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "กำลังเข้าสู่ระบบ..." : "login"}
        </button>
              <Link href="/register">
        <button className=" text-black w-full p-1 rounded hover:text-blue-900  transition-colors text-center ">
          Register
        </button>
      </Link>
      </form>
    </div>
  );
}
