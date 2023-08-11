import { getCurrentuser } from "@/libs/session"
import { authOptions } from '../pages/api/auth/[...nextauth]'

export default async function Home() {

  const user = await getCurrentuser()
  if (!user) {
    console.log('Não está logado')
  }
  return (
    <div>{user?.name}</div>
  )
}
