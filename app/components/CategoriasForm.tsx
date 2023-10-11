'use client'

import { Categorias, Outdoor } from '@prisma/client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./Button"
import { Controller, FormProvider, useForm } from "react-hook-form"
import z from 'zod'
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import Heading from "./Heading"
import { BsTrash } from "react-icons/bs"
import useCancelModal from "../hooks/useCancelModal"
import CancelModal from "./modal/CancelModal"
import { useCallback, useEffect, useState } from 'react'
import { ControllerInput } from './ControllerInput/Index'
import toast from 'react-hot-toast'

type CategoriasFormProps = {
    category: Categorias | null;
    outdoors: Outdoor[]
}


const CategoriasFormSchema = z.object({
    name: z.string().nonempty('Não pode ser vazio'),
    outdoorId: z.string().nonempty('Não pode ser vazio')
})

type CategoriasFormSchemaType = z.infer<typeof CategoriasFormSchema>

const CategoriasForm = ({ category, outdoors }: CategoriasFormProps) => {


    const title = category ? 'Editar categoria' : 'Criar categoria'
    const description = category ? 'Editar uma categoria' : 'Adicionar uma nova categoria'
    const action = category ? 'Salvar alterações' : 'Criar'
    const cancelModal = useCancelModal()
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const categoriasForm = useForm<CategoriasFormSchemaType>({
        resolver: zodResolver(CategoriasFormSchema), defaultValues: category || {
            name: '',
            outdoorId: ''
        }
    })
    const { register, handleSubmit, formState: { errors }, control, watch } = categoriasForm
    const onSubmit = async (data: CategoriasFormSchemaType) => {

        console.log(data)
        try {
            setIsLoading(true)
            if (category) {
                await axios.patch(`/api/${params.storeId}/categorias/${params.categoriasId}`, data)
                toast.success('Alterações salvas')
            } else {
                await axios.post(`/api/${params.storeId}/categorias`, data)
                toast.success('Categoria criada')
            }
            router.refresh()
            router.push(`/${params.storeId}/categorias`)

        }
        catch (error: any) {
            console.log('[ERRO CATEGORIA FORM REQ]', error)
        }
        finally{
            setIsLoading(false)
        }
    }


    const onDelete = async () => {
        try {
            await axios.delete(`/api/${params.storeId}/categorias/${params.categoriasId}`);
            router.refresh()
            router.push(`/${params.storeId}/categorias`)
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

    useEffect(() => {
        console.log("category:", category)
    }, [category])

    const outdoorId = watch('outdoorId')
    console.log(outdoorId)

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
                {category && (
                    <div>
                        <Button onClick={() => cancelModal.onOpen()} variant='secondary' size='icon'>
                            <BsTrash className='h-4 w-4' />
                        </Button>
                    </div>
                )}
            </div>
            <FormProvider {...categoriasForm}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-4 gap-2'>
                    <div className="flex gap-6 items-center  mb-2">
                        <div className="flex flex-col max-w-sm w-full">
                            <label>Nome</label>
                            <input {...register('name')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                            {errors.name?.message}
                        </div>
                        <ControllerInput.Field>
                            <ControllerInput.Label>
                                Outdoor
                            </ControllerInput.Label>
                            <Controller
                                control={control}
                                name='outdoorId'
                                defaultValue=''
                                render={({ field }) => (
                                    <ControllerInput.Outdoor data={outdoors} onChange={field.onChange} ref={field.ref} name={field.name} onBlur={field.onBlur} value={field.value} />
                                )}

                            />
                            <ControllerInput.ErrorMessage field='outdoorId' />
                        </ControllerInput.Field>
                    </div>
                    <div>
                        <Button size='lg' disabled={isLoading}>{action}</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default CategoriasForm

