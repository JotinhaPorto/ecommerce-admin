'use client'
import { Categorias } from '@/types/Tcategorias'
import { Button } from './Button'
import Heading from './Heading'
import { useParams, useRouter } from 'next/navigation'
import CategoriasItem from './CategoriasItem'
import { useEffect } from 'react'
import ApiList from './api-list'

type CategoriasTableProps = {
    data: Categorias[]
}

const CategoriasTable = ({ data }: CategoriasTableProps) => {

    useEffect(() => {
        console.log("data:", data)
    },
        [data])
    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className='flex justify-between'>
                <Heading
                    title={`Categorias(${data.length})`}
                    description='Gerencie as categorias dos seus produtos'
                />
                <div onClick={() => router.push(`/${params.storeId}/categorias/new`)}>
                    <Button size='lg'>+ Adicionar novo</Button>
                </div>
            </div>
            <div className='border-b py-2'></div>
            <table className='w-full my-2 border rounded'>
                <thead>
                    <tr className='border-b  '>
                        <th className='text-left w-1/5 px-6 py-4'>Nome</th>
                        <th className='text-left w-1/5 px-6 py-4'>Categoria</th>
                        <th className='text-left w-1/5 px-6 py-4'>Data</th>
                        <th className='py-4 w-1/5'></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <CategoriasItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </tbody>
            </table>
            <ApiList name='categorias' idName='categoryId' />
        </>
    )
}

export default CategoriasTable