'use client'

import { redirect, useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'
import axios from 'axios'
import z from 'zod'
import { signIn } from 'next-auth/react'

const page = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const router = useRouter()

    const onSubmit = (data: FieldValues) => {
        signIn('credentials', {
            ...data,
            redirect: false
        })
            .then((callback) => {
                if (callback?.ok) {
                    router.push('/')
                }
            })
            .catch(() => {
                console.log('error')
            })
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center '>
            <div className='flex flex-col gap-2 mb-4'>
                <h1 className='text-black font-semibold text-center text-4xl'>Entre na sua conta</h1>
                <h3 className='text-[#636A73] text-center'>Insira suas informações abaixo para entrar na sua conta</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' w-full max-w-xs sm:max-w-sm'>
                <div className='flex flex-col gap-2 my-1'>
                    <label>E-mail</label>
                    <input
                        {...register('email')}
                        type="text"
                        className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]"
                    />
                </div>
                <div className='flex flex-col gap-2 my-1'>
                    <label>Senha</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C] "
                    />
                </div>
                <button className='bg-[#121425] hover:bg-slate-800 text-white w-full mt-2 py-2 '>Entrar</button>
            </form>
            <div className='mt-2'>
                <span>Você não tem conta? <span className='text-[#636A73] cursor-pointer hover:underline' onClick={() => router.push('/register')}>Crie agora! </span></span>
            </div>
        </div>
    )
}

export default page