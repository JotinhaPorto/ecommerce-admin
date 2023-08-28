import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/libs/prisma"
import { redirect } from "next/navigation"

type layoutProps = {
    children: React.ReactNode
}

const layout = async ({ children }: layoutProps) => {

    const session = await getCurrentUser()

    if (!session) {
        redirect('/login')
    }


    const store = await prismadb.store.findFirst({
        where: {
            userId: session.id
        }
    })

    if (store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}

export default layout