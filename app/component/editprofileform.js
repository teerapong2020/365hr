"use client";
import { useState } from "react";
import { updateUser } from "@/utlit/useraction";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function EditProfileForm({ user }) {
  const [fullname, setFullname] = useState(user.fullname || "");
  const [lastname, setLastname] = useState(user.lastname || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [isfirst, setIsfirst] = useState(user.isfirst);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const phoneRegex = /^0[0-9]{9}$/;
  const isValidPhone = phoneRegex.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setIsfirst(false);
    try {
      const result = await updateUser(user.id, {
        fullname,
        lastname,
        phone,
        isfirst,
      });
      if (!isValidPhone) {
        alert("กรุณากรอกเบอร์โทรให้ถูกต้อง");
        return;
      }

      if (result.success) {
        router.push(`/hr/${user.id}`);
      } else {
        alert(result.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="ชื่อ"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="นามสกุล"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="เบอร์โทร"
        className="border p-2 w-full"
      />
      <input
        type="email"
        value={user.email}
        disabled
        className="border p-2 w-full bg-gray-100"
      />
      <input type="hidden" value={user.isfirst}></input>
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "กำลังบันทึก..." : "บันทึก"}
      </button>
    </form>
  );
}
