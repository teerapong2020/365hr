// /app/customer/page.jsx
import connection from "@/utlit/lib/connect_db";
import AddCustomer from "@/app/component/addcustomer";
import CustomerList from "@/app/component/customerlist";
import Link from "next/link";

export default async function Page({ params }) {
  const userId = await params;
  const [users] = await connection.query("SELECT * FROM users WHERE id = ?", [userId.id]);
  const [customers] = await connection.query("SELECT * FROM customers WHERE created_by = ?", [userId.id]);

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
