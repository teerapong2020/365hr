"use client";
import { useState } from "react";
import { registerAction } from "@/utlit/registeraction";
import { useActionState } from "react";
import Link from "next/link";

const initState = { 
  loading: false,
  message: "",
  success: false,
}

export default function Page() {
  const [email, setEmail] = useState("");     
  const [password, setPassword] = useState("");     
  const [confirmPassword, setConfirmPassword] = useState("");   
  const [state, formAction, isPending] = useActionState(registerAction, initState);

  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAction = (formData) => {
    const emailValue = formData.get('email');
    const passwordValue = formData.get('password');
    const confirmPasswordValue = formData.get('confirmPassword');
    
    if (!emailValue || !passwordValue || !confirmPasswordValue) {
      alert("❗ กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (!emailFormat.test(emailValue)) {
      alert("❗ กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }
    if (passwordValue !== confirmPasswordValue) {
      alert("❗ รหัสผ่านไม่ตรงกัน");
      return;
    }
    
    formAction(formData);
  };

  return (
    <div className="w-screen flex justify-center" >
      <form action={handleAction} className="space-y-4 w-1/3 max-md:w-full mx-8">
         <img src='/logo.png' width={"120px"} className=' rounded-full w-1/3 mx-auto'></img>
        <div>
          <label className="block text-lg font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending} 
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

        <div>
          <label className="block text-lg font-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isPending}
            className="border p-2 rounded w-full disabled:opacity-50"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded hover:bg-black transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "กำลังลงทะเบียน..." : "Register"}
        </button>
             <Link href="/login">
        <button className=" text-black w-full p-2 rounded hover:text-blue-600 transition-colors text-center mt-4">
          login
        </button>
      </Link>
      </form>
    </div>
  );
}