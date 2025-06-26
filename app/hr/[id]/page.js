import AddSale from "@/app/component/addsale";
import SaleList from "@/app/component/salelist";
import Link from "next/link";
import supabase from "@/utlit/lib/connect_db"; 

export default async function Page({ params }) {
  const userId =  await params?.id;

  // 1. ดึง user ที่ login อยู่
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .limit(1);

  if (userError || !users?.length) {
    console.error("Error loading user:", userError?.message);
    return <div>Error loading user.</div>;
  }

  const user = users[0];

  // 2. ดึง sale ที่ user นี้เป็นคนสร้าง
  const { data: sale, error: saleError } = await supabase
    .from("users")
    .select("*")
    .eq("created_by", userId);

  if (saleError) {
    console.error("Error loading sale:", saleError.message);
    return <div>Error loading sale list.</div>;
  }

  return (
    <div className="mx-8">
      <div className="flex my-4 flex-wrap gap-4">
        <div>
          <span className="font-bold">role:</span> {user.role}
        </div>
        <div>
          <span className="font-bold">fullname:</span> {user.fullname}
        </div>
        <div>
          <span className="font-bold">lastname:</span> {user.lastname}
        </div>
        <div>
          <span className="font-bold">phone:</span> {user.phone}
        </div>
        <div>
          <span className="font-bold">email:</span> {user.email}
        </div>
        <Link href="/">
          <button className="bg-gray-400 text-white px-4 py-2 rounded-xl hover:bg-black">
            Logout
          </button>
        </Link>
      </div>
      <AddSale userData={user} />
      <SaleList sale={sale} />
    </div>
  );
}
