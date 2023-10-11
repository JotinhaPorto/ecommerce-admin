import { OrderType } from "@/types/OrderType"

type PedidosItemProps = {
    data: OrderType
}

const PedidosItem = ({ data }: PedidosItemProps) => {
    return (
        <tr className='border-b relative'>
            <td className='px-6 py-4'>{data.products}</td>
            <td className='px-6 py-4'> {data.phone}</td>
            <td className='px-6 py-4'>{data.address}</td>
            <td className='px-6 py-4'>{data.totalPrice}</td>
            <td className='px-6 py-4'>{data.isPaid}</td>
        </tr>
    )
}

export default PedidosItem