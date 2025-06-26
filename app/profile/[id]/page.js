
import supabase from "@/utlit/lib/connect_db";
import EditProfileForm from "@/app/component/editprofileform";

export default async function Page({ params }) {
  const userId =  await params?.id
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .limit(1);

  if (error) {
    console.error("Error fetching user:", error.message);
    return <div>เกิดข้อผิดพลาดในการโหลดข้อมูล</div>;
  }
  if (users.length === 0) return <div>ไม่พบผู้ใช้</div>;

  const user = users[0];

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">แก้ไขโปรไฟล์</h1>
     <EditProfileForm user={user} />
    </div>
  );
}
