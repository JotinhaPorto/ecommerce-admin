'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Button from "./Button"
import { useForm } from "react-hook-form"
import z from 'zod'
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Size } from "@prisma/client"
import Heading from "./Heading"
import { BsTrash } from "react-icons/bs"
import useCancelModal from "../hooks/useCancelModal"
import CancelModal from "./modal/CancelModal"

type TamanhosForm = {
    size: Size | null;
}

const TamanhosFormSchema = z.object({
    name: z.string().nonempty('Não pode ser vazio'),
    value: z.string().nonempty('Não pode ser vazio')
})

type TamanhosFormSchemaType = z.infer<typeof TamanhosFormSchema>

const TamanhosForm = ({ size }: TamanhosForm) => {
    console.log(size, "tamanho")
    const title = size ? 'Editar tamanho' : 'Criar tamanho'
    const description = size ? 'Editar um tamanho' : 'Adicionar um novo tamanho'
    const action = size ? 'Salvar alterações' : 'Criar'
    const cancelModal = useCancelModal()
    const params = useParams()
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(TamanhosFormSchema), defaultValues: size || {
            name: '',
            value: ''
        }
    })

    const onSubmit = async (data: TamanhosFormSchemaType) => {
        try {
            if (size) {
                await axios.patch(`/api/${params.storeId}/tamanhos/${params.sizeId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/tamanhos`, data)
            }

            router.refresh()
            router.push(`/${params.storeId}/tamanhos`)

        }
        catch (error: any) {
            console.log('[ERRO TAMANHO FORM REQ]', error)
        }
    }


    const onDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/tamanhos/${params.sizeId}`);
            router.refresh()
            router.push(`/${params.storeId}/tamanhos`)
            console.log('deletado com sucesso')
            cancelModal.onClose()
        }
        catch (error: any) {
            console.log(error)
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
                {size && (
                    <div>
                        <button className=" p-3 rounded text-white bg-red-500 hover:bg-red-400" onClick={() => cancelModal.onOpen()}>
                            <BsTrash />
                        </button>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-4 gap-2'>
                <div className="flex gap-6">
                    <div className="flex flex-col max-w-sm w-full">
                        <label>Nome</label>
                        <input {...register('name')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                        {errors.name?.message}
                    </div>

                    <div className="flex flex-col max-w-sm w-full">
                        <label>Valor</label>
                        <input {...register('value')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                        {errors.value?.message}
                    </div>
                </div>

                <Button
                    containerStyles="rounded max-w-fit bg-[#121425] hover:bg-slate-800 text-white mt-2 py-2 px-6"
                    disabled={false}
                    label={action}

                />
            </form>
        </>
    )
}

export default TamanhosForm