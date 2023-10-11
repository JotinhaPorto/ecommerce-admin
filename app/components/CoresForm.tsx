'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./Button"
import { useForm } from "react-hook-form"
import z from 'zod'
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Color } from "@prisma/client"
import Heading from "./Heading"
import { BsTrash } from "react-icons/bs"
import useCancelModal from "../hooks/useCancelModal"
import CancelModal from "./modal/CancelModal"
import { useState } from "react"
import toast from "react-hot-toast"

type ColorForm = {
    color: Color | null;
}

const ColorFormSchema = z.object({
    name: z.string().nonempty('Não pode ser vazio'),
    value: z.string().min(4).max(9).regex(/^#/, {
        message: 'Deve ser um hex code valido'
    }),
})

type ColorFormSchemaType = z.infer<typeof ColorFormSchema>

const CoresForm = ({ color }: ColorForm) => {
    console.log(color, "cor")
    const title = color ? 'Editar cor' : 'Criar cor'
    const description = color ? 'Editar uma cor' : 'Adicionar uma nova cor'
    const action = color ? 'Salvar alterações' : 'Criar'
    const cancelModal = useCancelModal()
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(ColorFormSchema), defaultValues: color || {
            name: '',
            value: ''
        }
    })
    const colorWatch = watch('value')
    const onSubmit = async (data: ColorFormSchemaType) => {
        try {
            setIsLoading(true)
            if (color) {
                await axios.patch(`/api/${params.storeId}/cores/${params.colorId}`, data)
                toast.success('Alterações salvas')
            } else {
                await axios.post(`/api/${params.storeId}/cores`, data)
                toast.success('Cor criada')
            }

            router.refresh()
            router.push(`/${params.storeId}/cores`)

        }
        catch (error: any) {
            console.log('[ERRO TAMANHO FORM REQ]', error)
        }
        finally {
            setIsLoading(false)
        }
    }


    const onDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/cores/${params.colorId}`);
            router.refresh()
            router.push(`/${params.storeId}/cores`)
            toast.success('deletado com sucesso')
            cancelModal.onClose()
        }
        catch (error: any) {
            if (error.response.status === 400) {
                toast.error(error.response.data)
                cancelModal.onClose()
            }
        }
    }


    return (
        <>
            <CancelModal
                onDelete={onDelete}
            />
            <div className="flex justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {color && (
                    <div>
                        <Button onClick={() => cancelModal.onOpen()} variant='secondary' size='icon'>
                            <BsTrash className='h-4 w-4' />
                        </Button>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-8 gap-4'>
                <div className="flex gap-6 items-center ">
                    <div className="flex flex-col max-w-sm w-full justify-center  ">
                        <label>Nome</label>
                        <input {...register('name')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                        <div className="flex flex-col max-w-sm w-full justify-center ">
                            <span className="text-red-500 min-h-[1rem] text-xs">{errors.name?.message}</span>
                        </div>
                    </div>

                    <div className="flex flex-col max-w-sm w-full justify-center  ">
                        <label>Valor</label>
                        <input {...register('value')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                        <div className="flex flex-col max-w-sm w-full justify-center" >
                            <span className="text-red-500 min-h-[1rem] text-xs">{errors.value?.message}</span>
                        </div>
                    </div>
                    <div className=" flex rounded-full">
                        <span style={{ backgroundColor: colorWatch ? colorWatch : "#f1f5f9", width: 40, height: 40, borderRadius: 20 }}></span>
                    </div>
                </div>

                <div>
                    <Button size='lg' disabled={isLoading}>{action}</Button>
                </div>
            </form>
        </>
    )
}

export default CoresForm