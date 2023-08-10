import { create } from 'zustand'

type CreateModalStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateStoreModal = create<CreateModalStore>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useCreateStoreModal;