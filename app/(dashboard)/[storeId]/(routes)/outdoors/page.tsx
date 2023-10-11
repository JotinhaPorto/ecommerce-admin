import formatDate from '@/actions/formatDate'
import OutdoorsTable from '@/app/components/OutdoorsTable'
import prismadb from '@/libs/prisma'

type OutdoorsProps = {
    params: { storeId: string }
}

const page = async ({ params }: OutdoorsProps) => {

    const outdoors = await prismadb.outdoor.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    console.log(outdoors)

    const formattedOutdoors = outdoors.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: formatDate(item.createdAt)
    }))
    console.log(formattedOutdoors)

    return (
        <div className='pt-4 px-6 '>
            <OutdoorsTable outdoor={formattedOutdoors} />
        </div>
    )
}

export default page