import formatDate from "@/actions/formatDate"
import CategoriasTable from "@/app/components/CategoriasTable"
import prismadb from "@/libs/prisma"

type pageProps = {
    params: { storeId: string }
}

const page = async ({ params }: pageProps) => {


    const categorias = await prismadb.categorias.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            outdoor: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    const categoriasFormatadas = categorias.map((item) => ({
        id: item.id,
        name: item.name,
        outdoorLabel: item.outdoor.label,
        createdAt: formatDate(item.createdAt)
    }))


    return (
        <div className='pt-4 px-6 '>
            <CategoriasTable data={categoriasFormatadas} />
        </div>
    )
}

export default page