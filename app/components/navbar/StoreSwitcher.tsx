'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BiStore } from 'react-icons/bi'
import { IoIosAddCircleOutline } from 'react-icons/io'
import StoreInfo from './StoreInfo'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
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