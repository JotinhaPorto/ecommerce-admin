import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/libs/prisma"
import { NextResponse } from "next/server"



export async function GET(
    req: Request,
    { params }: { params: { produtoId: string } }
) {
    try {
        if (!params.produtoId) {
            return new NextResponse('O produtoId é necessário', { status: 400 })
        }

        const produtos = await prismadb.produtos.findUnique({
            where: {
                id: params.produtoId
            },
            include: {
                categorias: true,
                size: true,
                Color: true,
                Image: true
            }
        });

        return NextResponse.json(produtos);
    } catch (error) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
};


export async function PATCH(request: Request, { params }: { params: { produtoId: string } }) {
    try {
        const body = await request.json()
        const { name, images, price, categoriasId, sizeId, colorId, isArchived, isFeatured } = body
        const session = await getCurrentUser()

        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!name) {
            return new NextResponse("Nome é necessária", { status: 400 })
        }
        if (!images || !images.length) {
            return new NextResponse("image é necessário", { status: 400 })
        }
        if (!price) {
            return new NextResponse("price é necessário", { status: 400 })
        }
        if (!categoriasId) {
            return new NextResponse("categoriawsId é necessário", { status: 400 })
        }
        if (!sizeId) {
            return new NextResponse("sizeId é necessário", { status: 400 })
        }
        if (!colorId) {
            return new NextResponse("colorId é necessário", { status: 400 })
        }


        await prismadb.produtos.update({
            where: {
                id: params.produtoId
            },
            data: {
                name,
                price,
                categoriasId,
                colorId,
                sizeId,
                Image: {
                    deleteMany: {},
                },
                isFeatured,
                isArchived,
            },
        })

        const produto = await prismadb.produtos.update({
            where: {
                id: params.produtoId
            },
            data: {
                name,
                price,
                categoriasId,
                colorId,
                sizeId,
                Image: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
                isFeatured,
                isArchived,
            },
        })

        return NextResponse.json(produto)
    }
    catch (error: any) {
        return new NextResponse('Erro interno do servidor', { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { produtoId: string } }) {
    try {
        const session = await getCurrentUser()
        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!params.produtoId) {
            return new NextResponse('O outdoorId é necessário', { status: 400 })
        }
        const produto = await prismadb.produtos.delete({
            where: {
                id: params.produtoId
            }
        })
        return NextResponse.json(produto)
    }
    catch (error: any) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
}