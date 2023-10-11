import getColorOrNull from "@/actions/getValueOrNull"
import CoresForm from "@/app/components/CoresForm"

type pageProps = {
    params: { colorId: string }
}

const page = async ({ params }: pageProps) => {

    const color = await getColorOrNull(params.colorId)

    return (
        <div className='pt-4 px-6 '>
            <CoresForm color={color} />
        </div>
    )
}

export default page