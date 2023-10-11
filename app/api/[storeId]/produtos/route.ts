import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await request.json()
        const { name, images, price, categoriasId, sizeId, colorId, isArchived, isFeatured } = body
        console.log('Dados recebidos:', body);
        const session = await getCurrentUser()

        // status 400 → o servidor não entendeu ou processou a req, pois pode conter dados inválidos, parametros em falta ou incorretos, url mal formada, autenticação ou autorização falha 
        // status 403 → o servidor entendeu o pedido, mas não autoriza
        if (!session?.id) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!name) {
            return new NextResponse("name é necessário", { status: 400 })
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
        if (!params.storeId) {
            return new NextResponse("Id da loja é necessário", { status: 400 })
        }


        const produtos = await prismadb.produtos.create({
            data: {
                storeId: params.storeId,
                name,
                Image: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
                price,
                categoriasId,
                sizeId,
                colorId,
                isArchived,
                isFeatured

            }
        })
        return NextResponse.json(produtos)

    }
    catch (error: any) {
        return new NextResponse("Erro interno", { status: 500 })
    }
}


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { searchParams } = new URL(req.url)
        const categoriasId = searchParams.get('categoriasId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured');


        if (!params.storeId) {
            return new NextResponse("Store é necessário", { status: 400 });
        }

        const produtos = await prismadb.produtos.findMany({
            where: {
                storeId: params.storeId,
                categoriasId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                categorias: true,
                Color: true,
                size: true,
                Image: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(produtos);
    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
}