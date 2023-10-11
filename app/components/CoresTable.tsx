'use client'

import React from 'react'
import Heading from './Heading'
import { Button } from './Button'
import { useParams, useRouter } from 'next/navigation'
import { ColorType } from '@/types/ColorType'
import CoresItem from './CoresItem'
import ApiList from './api-list'

type CoresTableProps = {
    color: ColorType[] | null
}

const CoresTable = ({ color }: CoresTableProps) => {
    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className='flex justify-between'>
                <Heading
                    title={`Cores(${color?.length})`}
                    description='Gerencie as cores dos seus produtos'
                />
                <div onClick={() => router.push(`/${params.storeId}/cores/new`)}>
                    <Button size='lg'>+ Adicionar novo</Button>
                </div>
            </div>
            <div className='border-b py-2'></div>
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
                    {color?.map((item) => (
                        <CoresItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </tbody>
            </table>
            <ApiList name='cores' idName='colorId' />
        </>
    )
}

export default CoresTable