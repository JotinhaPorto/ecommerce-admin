

import getStores from '@/actions/getStores'
import { StoreType } from '@/types/StoreType'
import { AiOutlineCheck } from 'react-icons/ai'

type StoreInfoProps = {
    data: StoreType
}

const StoreInfo = ({ data }: StoreInfoProps) => {


    return (
        <li key={data.id} className='hover:bg-[#EFF2FA] cursor-pointer'>
            <div className='flex justify-between items-center px-2'>
                <span>{data.name}</span>
                <AiOutlineCheck />
            </div>
        </li>
    )
}

export default StoreInfo