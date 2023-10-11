import { ProductType } from '@/types/ProductType'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineContentCopy } from 'react-icons/md'

type ProdutoItemProps = {
    data: ProductType
}

const ProdutoItem = ({ data }: ProdutoItemProps) => {

    const router = useRouter()
    const params = useParams()
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const ButtonRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen((value) => !value)

    }

    const handleOutsideClick = (event: MouseEvent) => {
        if ((dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) && (ButtonRef.current && !ButtonRef.current.contains(event.target as Node))) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success(`Id ${id} copiado com sucesso`)
    }


    const teste = (id: string) => {
        console.log(id + "AQUI É O ID")
        // cancelModal.onOpen()
        if (id) {
            axios.delete(`/api/${params.storeId}/produtos/${id}`)
                .then(() => {
                    router.refresh()
                    // router.push(`/${params.storeId}/tamanhos`)
                    toast.success('deletado com sucesso')
                    // cancelModal.onClose()
                })
                .catch((error: any) => {
                    console.log(error)
                })

        }
    }

    return (
        <tr className='border-b relative'>
            <td className='px-6 py-4'>{data.name}</td>
            <td className='px-6 py-4'>{data.isArchived.toString()}</td>
            <td className='px-6 py-4'>{data.isFeatured.toString()}</td>
            <td className='px-6 py-4'>{data.price}</td>
            <td className='px-6 py-4'>{data.categoria}</td>
            <td className='px-6 py-4'>{data.size}</td>
            <td className='px-6 py-4'>
                <div className='flex gap-4 items-center'>
                    <span>{data.color}</span>
                    <span style={{ backgroundColor: data.color,width:25, height:25, borderRadius:20 }}></span>
                </div>
            </td>
            <td className='px-6 py-4'>{data.createdAt}</td>
            <td className='px-6 py-4'>
                <div className='flex justify-center'>
                    {isOpen && (
                        <div ref={dropdownRef} className='absolute top-10 border rounded z-10 flex flex-col bg-white gap-2 p-4'>
                            <h1 className='font-semibold'>Ações</h1>
                            <div onClick={() => onCopy(data.id)} className='flex items-center hover:bg-slate-100 px-2 rounded cursor-pointer gap-2'>
                                <MdOutlineContentCopy />
                                <p>Copiar Id</p>
                            </div>
                            <div className='flex items-center hover:bg-slate-100 px-2 rounded cursor-pointer gap-2' onClick={() => router.push(`/${params.storeId}/produtos/${data.id}`)}>
                                <GrUpdate />
                                <p>Modificar</p>
                            </div>
                            <div className='flex items-center hover:bg-slate-100 px-2 rounded cursor-pointer gap-2 ' onClick={() => teste(data.id)} >
                                <BsTrash />
                                <p>Deletar</p>
                            </div>

                        </div>
                    )}
                    <div className='hover:bg-gray-100 rounded' onClick={toggle} ref={ButtonRef}>
                        <AiOutlineEllipsis size={22} />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default ProdutoItem