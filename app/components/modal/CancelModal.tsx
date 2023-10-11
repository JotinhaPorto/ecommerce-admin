'use client'
import useCancelModal from '@/app/hooks/useCancelModal'
import Modal from './Modal'
import { Button } from '../Button';
type CancelModalProps = {
    onDelete?: () => void;
}

const CancelModal = ({ onDelete }: CancelModalProps) => {

    const cancelModal = useCancelModal()

    const body = (
        <div className='mt-8'>
            <div className="flex justify-end gap-2">
                <Button onClick={() => cancelModal.onClose()} variant='primary' >
                    Cancelar
                </Button>
                <Button onClick={onDelete}>
                    Continuar
                </Button>
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