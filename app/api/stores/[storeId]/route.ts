import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { storeId: string } }) {

    try {
        const session = await getCurrentUser()
        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!params.storeId) {
            return new NextResponse('O storeId é necessário', { status: 400 })
        }

        const store = await prismadb.store.delete({
            where: {
                id: params.storeId,
                userId: session.id
            }
        })

        return NextResponse.json(store)
    }

    catch (error: any) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }


}



export async function PATCH(request: Request, { params }: { params: { storeId: string } }) {

    try {
        const body = await request.json()
        const { name } = body
        const session = await getCurrentUser()

        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Nome é necessário", { status: 400 })
        }

        const store = await prismadb.store.update({
            where: {
                id: params.storeId,
                userId: session.id
            },
            data: {
                name: name
            }
        })

        return NextResponse.json(store)
    }
    catch (error: any) {
        return new NextResponse('Erro interno do servidor', { status: 500 })
    }
}