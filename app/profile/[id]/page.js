
import connection from "@/utlit/lib/connect_db";
import EditProfileForm from "@/app/component/editprofileform";

export default async function Page({ params }) {
  const userId =  await params
  const [users] = await connection.query("SELECT * FROM users WHERE id = ?", [userId.id]);
  if (users.length === 0) return <div>ไม่พบผู้ใช้</div>;

  const user = users[0];

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">แก้ไขโปรไฟล์</h1>
     <EditProfileForm user={user} />
    </div>
  );
}
