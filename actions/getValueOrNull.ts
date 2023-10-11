import prismadb from "@/libs/prisma"

export default async function getColorOrNull(colorId: string) {
    if (!colorId || colorId.length !== 24) {
        return null
    }
    const color = await prismadb.color.findUnique({
        where: {
            id: colorId
        }
    })
    if (!colorId) {
        return null
    }
    return color
}