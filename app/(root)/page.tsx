'use client'

import { useEffect } from "react"
import useCreateStoreModal from "../hooks/useCreateStoreModal"



const page = () => {


    const onOpen = useCreateStoreModal((state) => state.onOpen)
    const isOpen = useCreateStoreModal((state) => state.isOpen)

    useEffect(() => {
        if (!isOpen) onOpen()

    }, [isOpen, onOpen])

    return null;
}


export default page