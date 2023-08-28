'use client'

import { AuthUser } from "@/types/AuthUser"
import { signOut } from "next-auth/react"

type UserProps = {
    user: AuthUser;
}

const User = ({ user }: UserProps) => {
    return (
        <>
            {user && (
                <div>
                    {user.name}
                    <hr />
                    {user.id}
                    <button onClick={() => signOut()}>Sair</button>
                </div>
            )}
        </>
    )
}

export default User