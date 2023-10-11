'use client'

import { AuthUser } from "@/types/AuthUser"
import { signOut } from "next-auth/react"
import { useState } from "react";
import { PiSignOutLight } from 'react-icons/pi'
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { Button } from "./Button";

type UserProps = {
    user: AuthUser;
}

const User = ({ user }: UserProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen((value) => !value)
    }

    return (
        <div className="relative" >
            <div className="rounded-full border p-3 hover:bg-slate-50 cursor-pointer" onClick={toggle}>
                <AiOutlineUser className="w-6 h-6" />
            </div>
            {isOpen && (
                <div className="absolute top-[50px] right-2 shadow-lg rounded border w-[20vw] p-3 bg-white ">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <div className="px-2 flex items-center border rounded-full">
                                <AiOutlineUser className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold">{user.name}</span>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        {/* <div className="flex  gap-2 p-1 items-center hover:bg-slate-50 cursor-pointer rounded">
                            <AiOutlineSetting />
                            <span>Gerenciar a conta</span>
                        </div> */}
                        <div className="flex items-center gap-2 p-1 hover:bg-slate-50 cursor-pointer rounded">
                            <PiSignOutLight className="w-5 h-5" />
                            <button onClick={() => signOut()}>Sair</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default User