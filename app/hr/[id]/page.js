import AddSale from "@/app/component/addsale";
import connection from "@/utlit/lib/connect_db";


export default async function Page({ params }) {
  const userId = await params;
  const [users] = await connection.query("SELECT * FROM users WHERE id = ?", [
    userId.id,
  ]);
  const [sale] = await connection.query(
    "select * from users where created_by = ?",
    [userId.id]
  );

  const user = users[0];

  return (
    <div>
      {user.fullname} {user.lastname} {user.role} <br />
      {sale.length === 0 ? (
        <p>ยังไม่มี Sales</p>
      ) : (
        <ul className="list-disc ml-6">
          {sale.map((sale) => (
            <div key={sale.id}>
             <div> {sale.fullname} {sale.lastname} {sale.email} {sale.password} {sale.role}</div>
             <button>edit</button>
             <button>delete</button>
            </div>
          ))}
        </ul>
      )}
      <AddSale userData={user} />
    </div>
  );
}
