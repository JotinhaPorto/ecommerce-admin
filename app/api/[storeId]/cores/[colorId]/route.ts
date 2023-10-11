import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/libs/prisma"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        if (!params.colorId) {
            return new NextResponse('O colorId é necessário', { status: 400 })
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
};


export async function PATCH(request: Request, { params }: { params: { colorId: string } }) {
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

        const color = await prismadb.color.update({
            where: {
                id: params.colorId
            },
            data: {
                name: name,
                value: value
            }
        })

        return NextResponse.json(color)
    }
    catch (error: any) {
        return new NextResponse('Erro interno do servidor', { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { colorId: string } }) {
    try {
        const session = await getCurrentUser()
        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!params.colorId) {
            return new NextResponse('O colorId é necessário', { status: 400 })
        }
        const productWithThisColor = await prismadb.produtos.findMany({
            where: {
                colorId: params.colorId
            }
        })
        if (productWithThisColor.length > 0) {
            return new NextResponse("Não é possível apagar, pois a cor está sendo usada em algum produto", { status: 400 })
        }
        const color = await prismadb.color.delete({
            where: {
                id: params.colorId
            }
        })
        return NextResponse.json(color)
    }
    catch (error: any) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
}