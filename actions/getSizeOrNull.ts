import prismadb from "@/libs/prisma"

export default async function getSizeOrNull(sizeId: string) {
    if (!sizeId || sizeId.length !== 24) {
        return null
    }
    const size = await prismadb.size.findUnique({
        where: {
            id: sizeId
        }
    })
    if (!size) {
        return null
    }
    return size
}