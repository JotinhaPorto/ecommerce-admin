import formatDate from "@/actions/formatDate"
import TamanhosTable from "@/app/components/TamanhosTable"
import prismadb from "@/libs/prisma"

type pageProps = {
    params: { storeId: string }
}

const page = async ({ params }: pageProps) => {


    const size = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    const formatedSizes = size.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: formatDate(item.createdAt)
    }))




    return (
        <div className='pt-24 px-6 sm:pt-20'>
            <TamanhosTable size={formatedSizes} />
        </div>
    )
}

export default page