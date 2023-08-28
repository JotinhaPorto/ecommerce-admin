'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BiStore } from 'react-icons/bi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import StoreInfo from './StoreInfo'
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineCheck } from 'react-icons/ai'
import { StoreType } from '@/types/StoreType'
import useCreateStoreModal from '@/app/hooks/useCreateStoreModal'
import { useParams, usePathname } from 'next/navigation'

type StoreSwitcherProps = {
    stores: StoreType[]
}

const StoreSwitcher = ({ stores }: StoreSwitcherProps) => {

    const params = useParams()
    const createStore = useCreateStoreModal()
    const [isOpen, setIsOpen] = useState(false)


    const formattedStore = stores.map((item) => ({
        label: item?.name,
        value: item?.id
    }))

    const currentStore = formattedStore.find((item) => item.value === params.storeId)


    const toggle = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const handleClickOut = (event: MouseEvent) => {
        if ((DropdownRef.current && !DropdownRef.current.contains(event.target as Node)) && (ButtonRef.current && !ButtonRef.current.contains(event.target as Node))) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOut);

        return () => {
            document.removeEventListener('mousedown', handleClickOut)
        }
    }, [])

    const ButtonRef = useRef<HTMLDivElement | null>(null)
    const DropdownRef = useRef<HTMLDivElement | null>(null)

    return (
        <>
            <div
                ref={ButtonRef}
                onClick={toggle}
                className='border-[#F2F2F2] border hover:bg-[#EFF2FA] hover:shadow-sm flex max-w-fit items-center justify-center px-2 bg-white'
            >
                <BiStore />
                <button className='py-2 px-4'>{currentStore?.label}</button>
                {isOpen ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}

            </div>
            {isOpen && (
                <div ref={DropdownRef} className='overflow-hidden absolute border-2 border-[#F2F2F2] w-44  rounded-md top-16 z-10 divide-y divide-gray-100 bg-white' >
                    <div className='flex flex-col justify-center'>
                        <form>
                            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="search" className="block w-full p-2 pl-10 text-sm text-gray-900     dark:placeholder-gray-400 dark:text-white outline-none" placeholder="Pesquise a loja..." required />
                            </div>
                        </form>
                        <ul className='flex gap-1 flex-col border-y  py-2 px-2 text-sm'>
                            {stores.map((item: StoreType) => {
                                return (
                                    <StoreInfo
                                        key={item?.id}
                                        data={item}
                                        currentStore={currentStore}
                                    />
                                )
                            })}
                        </ul>
                        <div className='flex items-center py-2 px-2 gap-2 hover:bg-[#EFF2FA]'>
                            <button className='flex items-center gap-2' onClick={() => createStore.onOpen()}><IoIosAddCircleOutline />Criar loja</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default StoreSwitcher