'use client'
import useCancelModal from '@/app/hooks/useCancelModal'
import Modal from './Modal'
type CancelModalProps = {
    onDelete?: () => void;
}

const CancelModal = ({ onDelete }: CancelModalProps) => {

    const cancelModal = useCancelModal()

    const body = (
        <div className='mt-8'>
            <div className="flex justify-end gap-2">
                <button className='bg-white hover:bg-red-500 hover:text-white  mt-2 py-2 px-4 border border-[#D9D9D9] rounded'
                    onClick={() => cancelModal.onClose()} >Cancelar</button>
                <button onClick={onDelete} type='submit' className='bg-[#121425] hover:bg-slate-800 text-white mt-2 py-2 px-4 rounded' >Continuar</button>
            </div>
        </div>
    )

    return (
        <Modal
            title='Você tem certeza?'
            description='Esta ação não pode ser desfeita.'
            body={body}
            isOpen={cancelModal.isOpen}
            onClose={cancelModal.onClose}
        />
    )
}

export default CancelModal