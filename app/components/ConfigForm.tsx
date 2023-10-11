'use client'
import { StoreType } from "@/types/StoreType"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from 'zod'
import useCancelModal from "../hooks/useCancelModal"
import Heading from "./Heading"
import CancelModal from "./modal/CancelModal"
import { BsTrash } from "react-icons/bs"
import { toast } from "react-hot-toast"
import { useState } from "react"
import { Button } from "./Button"

const ConfigFormSchema = z.object({
    name: z.string().nonempty('Não pode ser vazio').min(6, 'o nome precisa de 6 letras')
})

type ConfigFormSchemaType = z.infer<typeof ConfigFormSchema>

type ConfigFormProps = {
    store: StoreType
}
const ConfigForm = ({ store }: ConfigFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ConfigFormSchemaType>({
        resolver: zodResolver(ConfigFormSchema), defaultValues: {
            name: store?.name
        }
    })

    const cancelModal = useCancelModal()
    const params = useParams()
    const router = useRouter()
    const onSubmit = async (data: ConfigFormSchemaType) => {

        setIsLoading(true)
        try {
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success('Nome atualizado')
        }

        catch (error: any) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('deletado com sucesso')
            cancelModal.onClose()
        }

        catch (error: any) {

        }
    }


    return (
        <>
            <CancelModal
                onDelete={onDelete}
            />
            <div className='flex justify-between'>
                <Heading
                    title="Configurações da loja"
                    description="Gerencie as configurações da loja"
                />
                <div>
                    <Button onClick={() => cancelModal.onOpen()} size='icon' variant='secondary'>
                        <BsTrash className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-4 max-w-sm gap-2'>
                <label>Name</label>
                <input {...register('name')} type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]" />
                {errors.name?.message}
                <div className="mt-4">
                    <Button size='lg' disabled={isLoading}>
                        Salvar alterações
                    </Button>
                </div>
            </form>
        </>
    )
}

export default ConfigForm