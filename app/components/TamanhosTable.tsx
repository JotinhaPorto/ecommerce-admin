'use client'

import Button from '@/app/components/Button'
import Heading from '@/app/components/Heading'
import { useParams, useRouter } from 'next/navigation'
import { SizeType } from '@/types/SizeType'
import TamanhosItem from './TamanhosItem'

type TamanhosTableProps = {
    size: SizeType[] | null
}

const TamanhosTable = ({ size }: TamanhosTableProps) => {



    const params = useParams()
    const router = useRouter()
    return (
        <>
            <div className='flex justify-between'>
                <Heading
                    title='Tamanhos'
                    description='Gerencie os tamanhos dos seus produtos'
                />
                <div onClick={() => router.push(`/${params.storeId}/tamanhos/new`)}>
                    <Button

                        label='+ Adicionar novo'
                        containerStyles='bg-[#0F1626] text-white py-2 px-4 rounded hover:bg-slate-800'
                        disabled={false}
                    />
                </div>
            </div>
            <div className='border-b py-2'></div>
            <div className='py-4'>
                SEARCH!
            </div>
            <table className='w-full my-2 border rounded'>
                <thead>
                    <tr className='border-b  '>
                        <th className='text-left w-1/5 px-6 py-4'>Nome</th>
                        <th className='text-left w-1/5 px-6 py-4'>Referência (valor)</th>
                        <th className='text-left w-1/5 px-6 py-4'>Data</th>
                        <th className='py-4 w-1/5'></th>
                    </tr>
                </thead>
                <tbody>
                    {size?.map((item) => (
                        <TamanhosItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TamanhosTable