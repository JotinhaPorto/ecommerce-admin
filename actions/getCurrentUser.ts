import { authOptions } from "@/libs/auth";
import prismadb from "@/libs/prisma";
import { getServerSession } from "next-auth";


export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try {
        const session = await getSession()

        if (!session?.user?.name) {
            return null
        }

        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null
        }


        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }

    }

    catch (error: any) {
        return null
    }
}