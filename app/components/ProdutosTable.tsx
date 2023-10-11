'use client'

import React from 'react'
import Heading from './Heading'
import { Button } from './Button'
import { useParams, useRouter } from 'next/navigation'
import { ProductType } from '@/types/ProductType'
import ProdutoItem from './ProdutoItem'
import ApiList from './api-list'

type ProductTableProps = {
    data: ProductType[]
}

const ProdutosTable = ({ data }: ProductTableProps) => {
    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className='flex justify-between'>
                <Heading
                    title={`Produtos(${data.length})`}
                    description='Gerencie os produtos da sua loja'
                />
                <div onClick={() => router.push(`/${params.storeId}/produtos/new`)}>
                    <Button size='lg'>+ Adicionar novo</Button>
                </div>
            </div>
            <div className='border-b py-4'></div>
            <table className='w-full my-4 border rounded'>
                <thead>
                    <tr className='border-b  '>
                        <th className='text-left  px-6 py-4'>Nome</th>
                        <th className='text-left  px-6 py-4'>Arquivado</th>
                        <th className='text-left px-6 py-4'>Apresentado</th>
                        <th className='text-left  px-6 py-4'>Preço</th>
                        <th className='text-left  px-6 py-4'>Categoria</th>
                        <th className='text-left  px-6 py-4'>Tamanho</th>
                        <th className='text-left  px-6 py-4'>Cor</th>
                        <th className='text-left  px-6 py-4'>Data</th>
                        <th className='py-4 w-1/5'></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <ProdutoItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </tbody>
            </table>
            <ApiList name='produtos' idName='produtoId' />
        </>
    )
}

export default ProdutosTable