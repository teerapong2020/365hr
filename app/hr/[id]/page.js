import AddSale from '@/app/component/addsale'
import connection from '@/utlit/connect_db'

export default async function Page({ params }) {
  const id = params.id
  const [users] = await connection.query("SELECT * FROM users WHERE id = ?", [id])
  const user = users[0]

  return (
    <div>
      {user.fullname} {user.lastname} <br />
      <AddSale />
    </div>
  )
}
