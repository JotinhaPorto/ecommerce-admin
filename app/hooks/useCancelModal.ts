import { create } from 'zustand'

type CancelModal = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCancelModal = create<CancelModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useCancelModal