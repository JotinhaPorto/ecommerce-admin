import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/libs/prisma"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { sizeId: string } }) {
    try {
        const body = await request.json()
        const { name, value } = body
        const session = await getCurrentUser()

        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }

        if (!name) {
            return new NextResponse("Nome é necessário", { status: 400 })
        }
        if (!value) {
            return new NextResponse("Valor é necessário", { status: 400 })
        }

        const size = await prismadb.size.update({
            where: {
                id: params.sizeId
            },
            data: {
                name: name,
                value: value
            }
        })

        return NextResponse.json(size)
    }
    catch (error: any) {
        return new NextResponse('Erro interno do servidor', { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { sizeId: string } }) {
    try {
        const session = await getCurrentUser()
        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!params.sizeId) {
            return new NextResponse('O sizeId é necessário', { status: 400 })
        }
        const size = await prismadb.size.delete({
            where: {
                id: params.sizeId
            }
        })
        return NextResponse.json(size)
    }
    catch (error: any) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
}