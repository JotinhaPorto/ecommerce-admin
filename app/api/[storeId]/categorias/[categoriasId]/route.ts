import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/libs/prisma"
import { NextResponse } from "next/server"


export async function GET(
    req: Request,
    { params }: { params: { categoriasId: string } }
) {
    try {
        if (!params.categoriasId) {
            return new NextResponse('O categoriasId é necessário', { status: 400 })
        }

        const categorias = await prismadb.categorias.findUnique({
            where: {
                id: params.categoriasId
            },
            include: {
                outdoor: true
            }
        });

        return NextResponse.json(categorias);
    } catch (error) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
};


export async function PATCH(request: Request, { params }: { params: { categoriasId: string } }) {
    try {
        const body = await request.json()
        const { name, outdoorId } = body
        const session = await getCurrentUser()

        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!name) {
            return new NextResponse("Nome é necessária", { status: 400 })
        }
        if (!outdoorId) {
            return new NextResponse("outdoorId é necessário", { status: 400 })
        }

        const categoria = await prismadb.categorias.update({
            where: {
                id: params.categoriasId
            },
            data: {
                name: name,
                outdoorId
            }
        })

        return NextResponse.json(categoria)
    }
    catch (error: any) {
        return new NextResponse('Erro interno do servidor', { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { categoriasId: string } }) {
    try {
        const session = await getCurrentUser()
        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!params.categoriasId) {
            return new NextResponse('O outdoorId é necessário', { status: 400 })
        }
        const productWithThisCategory = await prismadb.produtos.findMany({
            where: {
                categoriasId: params.categoriasId
            }
        })
        if (productWithThisCategory.length > 0) {
            return new NextResponse("Não é possível apagar, pois a categoria está sendo usada em algum produto", { status: 400 })
        }
        const categoria = await prismadb.categorias.delete({
            where: {
                id: params.categoriasId
            }
        })
        return NextResponse.json(categoria)
    }
    catch (error: any) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
}