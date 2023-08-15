import prismadb from "@/libs/prisma"

export default async function getStores(sessionId: string) {


    try {
        const stores = await prismadb.store.findMany({
            where: {
                userId: sessionId
            }
        })
        console.log(stores)
        return stores;
    }

    catch (error: any) {
        throw new Error(error)
    }
}