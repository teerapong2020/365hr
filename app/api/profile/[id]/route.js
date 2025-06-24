import connection from "@/utlit/connect_db";

export async function PATCH(req, { params }) {
  try {
    const id =   params.id;
    const data = await req.json();

    const { fullname, lastname, phone, profile } = data;

    const [existingUser] = await connection.query("SELECT id FROM users WHERE id = ?", [id]);
    if (existingUser.length === 0) {
      return new Response(JSON.stringify({ message: "ไม่พบผู้ใช้" }), { status: 404 });
    }

    const [result] = await connection.query(
      "UPDATE users SET fullname = ?, lastname = ?, phone = ?, profile = ? WHERE id = ?",
      [fullname, lastname, phone, profile, id]
    );

    return new Response(JSON.stringify({ message: "อัปเดตสำเร็จ" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "อัพโหลดไม่สำเร็จ" }), { status: 500 });
  }
}
