import formatDate from '@/actions/formatDate'
import ProdutosTable from '@/app/components/ProdutosTable'
import prismadb from '@/libs/prisma'
import React from 'react'
type pageprops = {
    params: { storeId: string }
}

const page = async ({ params }: pageprops) => {

    const produtos = await prismadb.produtos.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            categorias: true,
            Color: true,
            size: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const produtosFormatados = produtos.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: item.price,
        createdAt: formatDate(item.createdAt),
        categoria: item.categorias.name,
        size: item.size.name,
        color: item.Color.value
    }))

    return (
        <div className='pt-4 px-6 '>
            <ProdutosTable data={produtosFormatados} />
        </div>
    )
}

export default page