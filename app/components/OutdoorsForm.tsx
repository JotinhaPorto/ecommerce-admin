'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./Button"
import { Controller, useForm } from "react-hook-form"
import z from 'zod'
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Outdoor } from "@prisma/client"
import Heading from "./Heading"
import { BsTrash } from "react-icons/bs"
import useCancelModal from "../hooks/useCancelModal"
import CancelModal from "./modal/CancelModal"
import ImageUpload from "./ImageUpload"
import { useState } from "react"
import toast from "react-hot-toast"

type OutdoorsForm = {
    outdoor: Outdoor | null;
}

const OutdoorsFormSchema = z.object({
    label: z.string().nonempty('Não pode ser vazio'),
    imageSrc: z.string().nonempty('Selecione uma imagem')
})

type OutdoorsFormSchemaType = z.infer<typeof OutdoorsFormSchema>

const OutdoorsForm = ({ outdoor }: OutdoorsForm) => {



    console.log(outdoor, "outdoor")
    const title = outdoor ? 'Editar outdoor' : 'Criar outdoor'
    const description = outdoor ? 'Editar um outdoor' : 'Adicionar um novo outdoor'
    const action = outdoor ? 'Salvar alterações' : 'Criar'
    const cancelModal = useCancelModal()
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(OutdoorsFormSchema), defaultValues: outdoor || {
            label: '',
            imageSrc: ''
        }
    })

    const onSubmit = async (data: OutdoorsFormSchemaType) => {
        try {
            setIsLoading(true)
            if (outdoor) {
                await axios.patch(`/api/${params.storeId}/outdoors/${params.outdoorId}`, data)
                toast.success('Alterações salvas')
            } else {
                await axios.post(`/api/${params.storeId}/outdoors`, data)
                toast.success('Outdoor criado')
            }

            router.refresh()
            router.push(`/${params.storeId}/outdoors`)

        }
        catch (error: any) {
            console.log('[ERRO TAMANHO FORM REQ]', error)
        }
        finally{
            setIsLoading(false)
        }
    }


    const onDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/outdoors/${params.outdoorId}`);
            router.refresh()
            router.push(`/${params.storeId}/outdoors`)
            toast.success('deletado com sucesso')
            cancelModal.onClose()
        }
        catch (error: any) {
            if (error.response.status === 400){
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
                {outdoor && (
                    <div>
                        <Button onClick={() => cancelModal.onOpen()} variant='secondary' size='icon'>
                            <BsTrash className='h-4 w-4' />
                        </Button>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-4 gap-2'>

                <Controller
                    control={control}
                    defaultValue=''
                    name="imageSrc"
                    render={({ field }) => (
                        <ImageUpload
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange('')}
                            value={field.value ? [field.value] : []}
                        />
                    )}
                />
                {errors.imageSrc?.message}
                <div className="flex flex-col max-w-sm w-full">
                    <label>Nome da Coleção</label>
                    <input {...register('label')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                    {errors.label?.message}
                </div>


                <div>
                    <Button size='lg' disabled={isLoading}>{action}</Button>
                </div>
            </form>
        </>
    )
}

export default OutdoorsForm