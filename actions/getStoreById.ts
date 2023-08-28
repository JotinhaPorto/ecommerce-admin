import prismadb from "@/libs/prisma"


export default async function getStoreById(params: string) {

    try {
        const store = await prismadb.store.findFirst({
            where: {
                userId: params
            }

        })
        return store
    }

    catch (error: any) {
        throw new Error(error)
    }

}