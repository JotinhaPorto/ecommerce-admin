'use client'

import { signOut, useSession } from "next-auth/react"

export default function Home() {

  const { data, status } = useSession()

  const userKeysAndValues = data?.user ? Object.entries(data.user) : [];
  console.log(data)
  console.log(data?.user)

  console.log(status)

  return (

    <div>
      {data?.user ? (
        <div>
          {userKeysAndValues.map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value as any}
            </div>
          ))}
          <hr />
          <button onClick={() => signOut()}>Sair</button>
        </div>
      ) : (
        <div>Não temos session</div>
      )}
    </div>
  )
}
