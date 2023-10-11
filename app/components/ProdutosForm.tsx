'use client'

import { Categorias, Outdoor, Color, Size, Image, Produtos } from '@prisma/client'
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
import { ControllerInput } from './ControllerInput/Index'
import ImageUpload from './ImageUpload'
import toast from 'react-hot-toast'
import { useState } from 'react'


type ProdutosFormProps = {
    data: Produtos & {
        images: Image[]
    } | null;
    cores: Color[];
    tamanhos: Size[];
    categorias: Categorias[]
}




const ProdutosFormSchema = z.object({
    name: z.string().nonempty('Não pode ser vazio'),
    images: z.array(z.object({ url: z.string() })),
    price: z.coerce.number().min(1),
    categoriasId: z.string().min(1, 'Deve ter mais que 1 caracter'),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
}).refine((fields) => fields.images.length, {
    path: ['images'],
    message: "Selecione uma imagem"
})

type ProdutosFormSchemaType = z.infer<typeof ProdutosFormSchema>

const ProdutosForm = ({ categorias, cores, data, tamanhos }: ProdutosFormProps) => {
    const title = data ? 'Editar produto' : 'Criar produto'
    const description = data ? 'Editar um produto' : 'Adicionar um novo produto'
    const action = data ? 'Salvar alterações' : 'Criar'
    const cancelModal = useCancelModal()
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const ProdutosForm = useForm<ProdutosFormSchemaType>({
        resolver: zodResolver(ProdutosFormSchema), defaultValues: data || {
            images: [],
            name: '',
            price: 0,
            categoriasId: '',
            sizeId: '',
            colorId: '',
            isFeatured: false,
            isArchived: false
        }
    })
    const { register, handleSubmit, formState: { errors }, control, setValue } = ProdutosForm
    const onSubmit = async (Data: ProdutosFormSchemaType) => {
        console.log(data)
        try {
            if (data) {
                await axios.patch(`/api/${params.storeId}/produtos/${params.produtoId}`, Data)
                toast.success('Alterações salvas')
            } else {
                await axios.post(`/api/${params.storeId}/produtos`, Data)
                toast.success('Produto criado')
            }
            router.refresh()
            router.push(`/${params.storeId}/produtos`)

        }
        catch (error: any) {
            console.log('[ERRO produtos FORM REQ]', error)
        }

    }


    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/${params.storeId}/produtos/${params.produtoId}`);
            router.refresh()
            router.push(`/${params.storeId}/produtos`)
            toast.success('deletado com sucesso')
            cancelModal.onClose()
        }
        catch (error: any) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
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
                {data && (
                    <div>
                        <Button onClick={() => cancelModal.onOpen()} variant='secondary' size='icon'>
                            <BsTrash className='h-4 w-4' />
                        </Button>
                    </div>
                )}
            </div>

            <FormProvider {...ProdutosForm}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-4 gap-2 '>
                    <div className='flex flex-col relative'>
                        <label >Imagens</label>
                        <Controller
                            control={control}
                            name='images'
                            defaultValue={[{ url: "" }]}
                            render={({ field }) => (
                                <ImageUpload
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    value={field.value.map((image) => image.url)}
                                />
                            )}
                        />
                        {errors.images?.message}
                    </div>
                    <div className="flex gap-6 items-center mb-2">
                        <div className="flex flex-col max-w-sm w-full">
                            <label>Nome</label>
                            <input {...register('name')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                            {errors.name?.message}
                        </div>
                        <div className="flex flex-col max-w-sm w-full">
                            <label>Preço</label>
                            <input {...register('price')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                            {errors.price?.message}
                        </div>
                        <ControllerInput.Field >
                            <ControllerInput.Label>
                                Categorias
                            </ControllerInput.Label>
                            <Controller
                                control={control}
                                name='categoriasId'
                                defaultValue=""
                                render={({ field }) => (
                                    <ControllerInput.Categorias name={field.name} onBlur={field.onBlur} ref={field.ref} onChange={field.onChange} value={field.value} data={categorias} />
                                )}
                            />
                            <ControllerInput.ErrorMessage field='categoriasId' />
                        </ControllerInput.Field>
                    </div>
                    <div className='flex gap-6'>
                        <ControllerInput.Field >
                            <ControllerInput.Label>
                                Tamanho
                            </ControllerInput.Label>
                            <Controller
                                control={control}
                                name='sizeId'
                                defaultValue=""
                                render={({ field }) => (
                                    <ControllerInput.Tamanhos name={field.name} onBlur={field.onBlur} ref={field.ref} onChange={field.onChange} value={field.value} data={tamanhos} />
                                )}
                            />
                            <ControllerInput.ErrorMessage field='sizeId' />
                        </ControllerInput.Field>
                        <ControllerInput.Field>
                            <ControllerInput.Label>
                                Cor
                            </ControllerInput.Label>
                            <Controller
                                control={control}
                                name='colorId'
                                defaultValue=""
                                render={({ field }) => (
                                    <ControllerInput.Cores name={field.name} onBlur={field.onBlur} ref={field.ref} onChange={field.onChange} value={field.value} data={cores} />
                                )}
                            />
                            <ControllerInput.ErrorMessage field='colorId' />
                        </ControllerInput.Field>
                        <div className="flex flex-col border max-w-sm w-full rounded p-3 shadow">
                            <div className='flex gap-2 '>
                                <input {...register('isFeatured')} type="checkbox" className="cursor-pointer accent-[#121425] border rounded  border-[#121425] w-4" />
                                <label className='font-semibold'>Apresentado</label>
                            </div>
                            <p>Este produto vai aparecer na página inicial</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm w-full border rounded p-3 shadow">
                        <div className='flex gap-2'>
                            <input {...register('isArchived')} type="checkbox" className="cursor-pointer rounded accent-[#121425] border border-[#121425] w-4" />
                            <label className='font-semibold'>Arquivado</label>
                        </div>
                        <p>Este produto não vai aparecer em nenhum lugar da loja</p>
                    </div>
                    <div>
                        <Button size='lg' disabled={isLoading}>{action}</Button>
                    </div>
                </form>
            </FormProvider >

        </>
    )
}

export default ProdutosForm
