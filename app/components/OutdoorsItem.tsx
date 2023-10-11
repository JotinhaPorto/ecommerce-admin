'use client'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { MdOutlineContentCopy } from 'react-icons/md'
import { GrUpdate } from 'react-icons/gr'
import { BsTrash } from 'react-icons/bs'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import useCancelModal from '../hooks/useCancelModal'
import { OutdoorType } from '@/types/OutdoorType'

type OutdoorsItemProps = {
    data: OutdoorType
}
const OutdoorsItem = ({ data }: OutdoorsItemProps) => {
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
    const cancelModal = useCancelModal()


    const teste = (id: string) => {
        console.log(id + "AQUI É O ID")
        // cancelModal.onOpen()
        if (id) {
            axios.delete(`/api/${params.storeId}/outdoors/${id}`)
                .then(() => {
                    router.refresh()
                    // router.push(`/${params.storeId}/tamanhos`)
                    toast.success('deletado com sucesso')
                    // cancelModal.onClose()
                })
                .catch((error: any) => {
                    if (error.response.status === 400){
                        toast.error(error.response.data)
                    }
                })

        }
    }

    return (
        <>
            {/* <CancelModal

            /> */}

            <tr className='border-b relative'>
                <td className='px-6 py-4'>{data.label}</td>
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
                                <div className='flex items-center hover:bg-slate-100 px-2 rounded cursor-pointer gap-2' onClick={() => router.push(`/${params.storeId}/outdoors/${data.id}`)}>
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
        </>
    )
}

export default OutdoorsItem

