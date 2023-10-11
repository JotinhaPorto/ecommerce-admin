'use client'

import Heading from './Heading'
import {Button} from './Button'
import { useParams, useRouter } from 'next/navigation'
import OutdoorsItem from './OutdoorsItem'
import { OutdoorType } from '@/types/OutdoorType'
import ApiList from './api-list'
type OutdoorsTableProps = {
    outdoor: OutdoorType[] | null
}


const OutdoorsTable = ({ outdoor }: OutdoorsTableProps) => {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className='flex justify-between'>
                <Heading
                    title={`Outdoors(${outdoor?.length})`}
                    description='Gerencie os outdoors da sua loja'
                />
                <div onClick={() => router.push(`/${params.storeId}/outdoors/new`)}>
                   <Button size='lg'>+ Adicionar novo</Button>
                </div>
            </div>
            <div className='border-b py-2'></div>
            <table className='w-full my-2 border rounded'>
                <thead>
                    <tr className='border-b  '>
                        <th className='text-left w-1/5 px-6 py-4'>Coleção</th>
                        <th className='text-left w-1/5 px-6 py-4'>Data</th>
                        <th className='py-4 w-1/5'></th>
                    </tr>
                </thead>
                <tbody>
                    {outdoor?.map((item) => (
                        <OutdoorsItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </tbody>
            </table>
            <ApiList name='outdoors' idName='outdoorId' />
        </>
    )
}

export default OutdoorsTable