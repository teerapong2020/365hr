// /app/customer/page.jsx
import supabase from "@/utlit/lib/connect_db";
import AddCustomer from "@/app/component/addcustomer";
import CustomerList from "@/app/component/customerlist";
import Link from "next/link";

export default async function Page({ params }) {
  const userId =  await params?.id;
const { data: users, error: userError } = await supabase
  .from("users")
  .select("*")
  .eq("id", userId);

if (userError) {
  console.error("Error loading user:", userError.message);
  return <div>Error loading user.</div>;
}

const { data: customers, error: customerError } = await supabase
  .from("customers")
  .select("*")
  .eq("created_by", userId);

if (customerError) {
  console.error("Error loading customers:", customerError.message);
  return <div>Error loading customers.</div>;
}

  const user = users[0];

  return (
   <div className="mx-8">
      <div className="flex my-4 ">
        <div>
          <span className="font-bold">role:</span> {user.role}
        </div>
        &nbsp;
        <div>
          <span className="font-bold">fullname:</span> {user.fullname}
        </div>
        &nbsp;
        <div>
          <span className="font-bold">lastname:</span> {user.lastname}
        </div>
        &nbsp;
        <div>
          <span className="font-bold">phone:</span> {user.phone}
        </div>
        &nbsp;
        <div>
          <span className="font-bold">email:</span> {user.email}
        </div>

        <Link href={"/"}>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-xl  hover:bg-black">
            Logout
          </button>
        </Link>
      </div>
      <AddCustomer userData={user} />
      <CustomerList customers={customers} />
    </div>
  );
}
