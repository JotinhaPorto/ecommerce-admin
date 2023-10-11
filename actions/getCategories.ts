import prismadb from "@/libs/prisma"
export default async function getCategoriesOrNull(categoryId: string) {
    if (!categoryId || categoryId.length !== 24) {
        return null
    }
    const categories = await prismadb.categorias.findUnique({
        where: {
            id: categoryId
        },
        include: {
            outdoor: true
        }
    })

    if (!categories) {
        return null
    }

    const categoriaFormatada = {
        id: categories?.id,
        name: categories?.name,
        outdoorId: categories?.outdoorId
    }


    return categoriaFormatada
}