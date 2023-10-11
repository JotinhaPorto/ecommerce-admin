import { BsHddStack } from 'react-icons/bs'
import { MdOutlineContentCopy } from 'react-icons/md'
import { Button } from './Button';
import toast from 'react-hot-toast';

type apiItemProps = {
    title: string;
    description: string;
}

const apiItem = ({ title, description }: apiItemProps) => {

    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description)
        toast.success('Rota da API copiada para área de transferência')
    }

    return (
        <div className="border rounded my-5 p-4 flex flex-col">
            <div className='flex items-center gap-2'>
                <BsHddStack />
                <h1 className='font-semibold'>{title}</h1>
            </div>
            <div className='px-6 flex justify-between items-center'>
                <code className='bg-slate-100 px-2 font-semibold rounded'>
                    {description}
                </code>
                <Button size='sm' variant='primary' onClick={() => onCopy(description)}>
                    <MdOutlineContentCopy />
                </Button>
            </div>
        </div>
    )
}

export default apiItem