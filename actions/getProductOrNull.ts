import prismadb from "@/libs/prisma"

export default async function getProdutosOrNull(productId: string) {
    if (!productId || productId.length !== 24) {
        return null
    }
    const produtos = await prismadb.produtos.findUnique({
        where: {
            id: productId
        },
        include: {
            Image: true,
            categorias: true,
            size: true,
            Color: true
        }
    })
    if (!produtos) {
        return null
    }

    const produtoFormatado = {
        id: produtos.id,
        name: produtos.name,
        price: produtos.price,
        images: produtos.Image,
        categoriasId: produtos.categoriasId,
        sizeId: produtos.sizeId,
        colorId: produtos.colorId,
        isFeatured: produtos.isFeatured,
        isArchived: produtos.isArchived
    }

    return produtoFormatado
}