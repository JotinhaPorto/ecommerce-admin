'use client'

import { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    form?: React.ReactElement;
    body?: React.ReactElement;
    title: string;
    description: string;
}

const Modal = ({ isOpen, form, onClose, description, title, body }: ModalProps) => {

    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])


    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center ">
            <div className="border border-[#D9D9D9] max-w-lg w-full rounded px-2 py-4  sm:py-8 sm:px-4 flex flex-col shadow-lg">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold text-xl">{title}</h1>
                        <p className="text-xs sm:text-sm">{description}</p>
                    </div>
                    <div onClick={handleClose}>
                        <button className='hover:bg-slate-300  hover:text-white rounded p-[2px]'><AiOutlineClose /></button>

                    </div>
                </div>
                {/* area form, caso tenha */}
                {form}
                {body}
            </div>
        </div>
    )

}

export default Modal


// no storeModal, tenho que criar uma prop chamada form que vai ter as validações com os inputs dos campos e os labels e o form como pai desse campos todos  