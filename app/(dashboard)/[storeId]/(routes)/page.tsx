import getCurrentUser from "@/actions/getCurrentUser"
import { Card } from "@/app/components/Card"
import Heading from "@/app/components/Heading"
import { AiOutlineCodepen, AiOutlineRise } from "react-icons/ai"
import { BiDollar } from "react-icons/bi"
import { PiCodesandboxLogoLight } from "react-icons/pi"




type pageProps = {
    params: { storeId: string }
}



const page = async ({ params }: pageProps) => {

    const session = await getCurrentUser()


    return (
        <div className='pt-4 px-6 '>
            <div className='flex'>
                <Heading
                    title='Dashboard'
                    description='Visão geral da sua loja'
                />
            </div>
            <div className='border-b py-4'></div>
            <div className="flex gap-4">
                <Card.Container>
                    <Card.Header>
                        <Card.Title>Receita</Card.Title>
                        <BiDollar className="w-5 h-5"/>
                    </Card.Header>
                    <Card.Content>
                        R$ 500,00
                    </Card.Content>
                </Card.Container>
                <Card.Container>
                    <Card.Header>
                        <Card.Title>Vendas</Card.Title>
                        <AiOutlineRise className="w-5 h-5"/>
                    </Card.Header>
                    <Card.Content>
                        +100
                    </Card.Content>
                </Card.Container>
                <Card.Container>
                    <Card.Header>
                        <Card.Title>Produtos em estoque</Card.Title>
                        <PiCodesandboxLogoLight className="w-5 h-5"/>
                    </Card.Header>
                    <Card.Content>
                        20
                    </Card.Content>
                </Card.Container>
            </div>
        </div>
    )
}

export default page