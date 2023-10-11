import formatDate from '@/actions/formatDate'
import PedidosTable from '@/app/components/PedidosTable'
import prismadb from '@/libs/prisma'
import React from 'react'
type pageprops = {
    params: { storeId: string }
}
const page = async ({ params }: pageprops) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            OrderItem: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.OrderItem.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: item.OrderItem.map((orderItem) => orderItem.product.price),
        isPaid: item.isPaid,
        createdAt: formatDate(item.createdAt)
    }))

    return (
        <div className='pt-4 px-6 '>
            <PedidosTable data={formattedOrders}/>
        </div>
    )
}

export default page