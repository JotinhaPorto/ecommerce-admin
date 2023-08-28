

import getStores from '@/actions/getStores'
import { StoreType } from '@/types/StoreType'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineCheck } from 'react-icons/ai'

type StoreInfoProps = {
    data: StoreType;
    currentStore?: {
        value: string,
        label: string
    }
}

const StoreInfo = ({ data, currentStore }: StoreInfoProps) => {

    const router = useRouter()

    return (
        <li key={data?.id} className=' cursor-pointer'>
            <div
                onClick={() => router.push(`/${data?.id}`)}
                className={`flex justify-between items-center px-2 ${currentStore?.value === data?.id ? 'bg-[#EFF2FA]' : 'bg-white'}`}
            >
                <span>{data?.name}</span>
                {currentStore?.value === data?.id && (
                    <AiOutlineCheck />
                )}
            </div>
        </li >
    )
}

export default StoreInfo;