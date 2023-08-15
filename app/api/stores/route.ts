import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {


    const body = await request.json()
    const currentUser = await getCurrentUser()
    const { storeName } = body


    if (!currentUser) {
        return new NextResponse("Não autorizado", { status: 403 })
    }

    if (!storeName) {
        return new NextResponse("É necessário ter um nome", { status: 400 })
    }

    const store = await prismadb.store.create({
        data: {
            name: storeName as string,
            userId: currentUser.id
        }
    })

    return NextResponse.json(store)



    // meta: {message: `Malformed ObjectID: invalid character '-' was found at index 8 in the provided hex string: "a0cde7d0-d7ad-47de-b2ea-b28b2ff0c33b" for the field 'id'.`}


}