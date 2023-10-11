import { OrderType } from '@/types/OrderType'
import Heading from './Heading'
import PedidosItem from './PedidosItem'

type PedidosTableProps = {
    data: OrderType[]
}

const PedidosTable = ({ data }: PedidosTableProps) => {


    return (
        <>
            <div className='flex justify-between'>
                <Heading
                    title={`Pedidos(${data.length})`}
                    description='Gerencie os pedidos da sua loja'
                />
            </div>
            <div className='border-b py-4'></div>
            <table className='w-full my-4 border rounded'>
                <thead>
                    <tr className='border-b  '>
                        <th className='text-left w-1/3  px-6 py-4'>Produtos</th>
                        <th className='text-left  px-6 py-4'>Contato</th>
                        <th className='text-left px-6 py-4'>Endereço</th>
                        <th className='text-left  px-6 py-4'>Preço</th>
                        <th className='text-left  px-6 py-4'>Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <PedidosItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default PedidosTable