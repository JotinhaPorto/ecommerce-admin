import formatDate from '@/actions/formatDate'
import CoresTable from '@/app/components/CoresTable'
import prismadb from '@/libs/prisma'
import React from 'react'

type pageProps = {
    params: { storeId: string }
}

const page = async ({ params }: pageProps) => {

    const color = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    const formatedColors = color.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: formatDate(item.createdAt)
    }))

    return (
        <div className='pt-4 px-6 '>
            <CoresTable color={formatedColors} />
        </div >
    )
}

export default page