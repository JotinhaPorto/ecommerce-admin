import getCurrentUser from "@/actions/getCurrentUser";
import getStores from "@/actions/getStores";
import Navbar from "@/app/components/navbar/navbar";
import prismadb from "@/libs/prisma";
import { redirect } from "next/navigation";





type layoutProps = {
    children: React.ReactNode;
    params: { storeId: string }
}



const layout = async ({ children, params }: layoutProps) => {


    const session = await getCurrentUser()

    if (!session) {
        redirect('/')
    }


    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: session.id
        }
    })

   

    if (!store) {
        redirect('/')
    }


    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default layout