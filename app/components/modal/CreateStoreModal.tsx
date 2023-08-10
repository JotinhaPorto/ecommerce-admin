'use client'
import useCreateStoreModal from "@/app/hooks/useCreateStoreModal"
import Modal from "./Modal"
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

const createStoreModalSchema = z.object({
    storeName: z.string().nonempty('O nome da loja é obrigatório').min(6, 'O nome da loja precisa ter no minimo 6 caracteres').max(15, 'O nome da loja não pode ter mais que 15 caracteres')
})

type createStoreModalSchemaType = z.infer<typeof createStoreModalSchema>

const CreateStoreModal = () => {



    const { register, handleSubmit, formState: { errors } } = useForm<createStoreModalSchemaType>({ resolver: zodResolver(createStoreModalSchema) })

    const storeModal = useCreateStoreModal()

    const onSubmit = (data: createStoreModalSchemaType) => {
        console.log(data)
    }

    const formulario = (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 my-5">
                    <label>Nome</label>
                    <input
                        {...register('storeName')}
                        type="text"
                        placeholder="E-Commerce"
                        className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C] "
                    />
                    {errors.storeName?.message}
                </div>
                <div className="flex justify-end gap-2">
                    <button className='bg-white hover:bg-red-500 hover:text-white  mt-2 py-2 px-4 border border-[#D9D9D9] rounded'>Cancelar</button>
                    <button type='submit' className='bg-[#121425] hover:bg-slate-800 text-white mt-2 py-2 px-4 rounded'>Continuar</button>
                </div>
            </form>
        </div>
    )

    return (
        <Modal
            title="Criar Loja"
            description="Adicione uma nova loja para gerenciar produtos e categorias"
            form={formulario}
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        />
    )

}

export default CreateStoreModal