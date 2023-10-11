import getCurrentUser from "@/actions/getCurrentUser"
import ConfigForm from "@/app/components/ConfigForm"
import prismadb from "@/libs/prisma"
import { redirect } from "next/navigation"
type pageProps = {
    params: { storeId: string }
}

const page = async ({ params }: pageProps) => {

    const session = await getCurrentUser()


    if (!session) {
        redirect('/login')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })


    return (
        <div className='pt-4 px-6 '>
            <ConfigForm store={store} />
        </div>
    )
}

export default page