import getOutdoorOrNull from '@/actions/getOutdoorOrNull'
import OutdoorsForm from '@/app/components/OutdoorsForm'

type pageProps = {
    params: { outdoorId: string }
}

const page = async ({ params }: pageProps) => {

    const outdoor = await getOutdoorOrNull(params.outdoorId)

    return (
        <div className='pt-4 px-6 '>
            <OutdoorsForm outdoor={outdoor} />
        </div>
    )
}

export default page
