import getProdutosOrNull from "@/actions/getProductOrNull"
import ProdutosForm from "@/app/components/ProdutosForm"
import prismadb from "@/libs/prisma"

type pageProps = {
    params: { produtoId: string, storeId: string }
}


const page = async ({ params }: pageProps) => {

    const produto = await getProdutosOrNull(params.produtoId)




    const cores = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const categorias = await prismadb.categorias.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const tamanhos = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        }
    })



    return (
        <div className="pt-4 px-6"    >
            <ProdutosForm
                data={produto}
                cores={cores}
                categorias={categorias}
                tamanhos={tamanhos}
            />
        </div>
    )
}

export default page