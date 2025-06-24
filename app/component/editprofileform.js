"use client";
import { useState } from "react";

export default function EditProfileForm({ user }) {
  const [fullname, setFullname] = useState(user.fullname || "");
  const [lastname, setLastname] = useState(user.lastname || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/profile/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, lastname, phone }),
      });

      if(res.ok){
        window.location.href=`/hr/${user.id}`;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "กำลังบันทึก..." : "บันทึก"}
      </button>
    </form>
  );
}
