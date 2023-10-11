import prismadb from "@/libs/prisma"

export default async function getOutdoorOrNull(outdoorId: string) {
    if (!outdoorId || outdoorId.length !== 24) {
        return null
    }
    const outdoor = await prismadb.outdoor.findUnique({
        where: {
            id: outdoorId
        }
    })
    if (!outdoor) {
        return null
    }
    return outdoor
}