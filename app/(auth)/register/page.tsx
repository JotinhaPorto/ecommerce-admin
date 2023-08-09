'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import z from 'zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserFormSchema = z.object({
    name: z.string().nonempty('Nome é obrigatório').min(6, 'O nome precisa de 6 letras'),
    email: z.string().nonempty('O e-mail é obrigatório').email('Formato de e-mail inválido'),
    password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres')
})

type createUserFormSchemaType = z.infer<typeof createUserFormSchema>

const page = () => {


    const { register, handleSubmit, formState: { errors } } = useForm<createUserFormSchemaType>({ resolver: zodResolver(createUserFormSchema) })
    const router = useRouter()

    const onSubmit = (data: createUserFormSchemaType) => {
        axios.post('/api/register', data)
        .then(()=>{
            console.log('criado')
            router.push('/login')
        })
        .catch(()=>{
            console.log('ocorreu algum erro')
        })
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center '>
            <div className='flex flex-col gap-2 mb-4'>
                <h1 className='text-black font-semibold text-center text-4xl'>Crie uma Conta</h1>
                <h3 className='text-[#636A73] text-center'>Insira suas informações abaixo para criar sua conta</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-xs sm:max-w-sm'>
                <div className='flex flex-col gap-2 my-1'>
                    <label>Nome</label>
                    <input
                        {...register('name')}
                        className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C] "
                        type="text"
                    />
                    {errors.name?.message}
                </div>
                <div className='flex flex-col gap-2 my-1'>
                    <label>E-mail</label>
                    <input
                        {...register('email')}
                        type="text" className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C] "
                        placeholder='m@examplo.com'
                    />
                    {errors.email?.message}
                </div>
                <div className='flex flex-col gap-2 my-1'>
                    <label>Senha</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C] "
                    />
                    {errors.password?.message}
                </div>
                <button type='submit' className='bg-[#121425] hover:bg-slate-800 text-white w-full mt-2 py-2 '>Criar</button>
            </form>
            <div className='mt-2'>
                <span>Você já tem conta? <span className='text-[#636A73] cursor-pointer hover:underline' onClick={() => router.push('/login')}>Faça login! </span></span>
            </div>
        </div>
    )
}

export default page