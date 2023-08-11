import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";

export async function getCurrentuser() {
    
    const session = await getServerSession(authOptions)

    return session?.user
}