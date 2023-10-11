import getSizeOrNull from "@/actions/getSizeOrNull"
import TamanhosForm from "@/app/components/TamanhosForm"

type pageProps = {
    params: { sizeId: string }
}
const page = async ({ params }: pageProps) => {
    const size = await getSizeOrNull(params.sizeId)
    console.log(size)
    return (
        <div className='pt-4 px-6 '>
            <TamanhosForm size={size} />
        </div>
    )
}

export default page