import getCurrentUser from "@/actions/getCurrentUser"
import prismadb from "@/libs/prisma"
import { NextResponse } from "next/server"



export async function GET(
    req: Request,
    { params }: { params: { outdoorId: string } }
) {
    try {
        if (!params.outdoorId) {
            return new NextResponse('O outdoorId é necessário', { status: 400 })
        }

        const outdoor = await prismadb.outdoor.findUnique({
            where: {
                id: params.outdoorId
            }
        });

        return NextResponse.json(outdoor);
    } catch (error) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
};


export async function PATCH(request: Request, { params }: { params: { outdoorId: string } }) {
    try {
        const body = await request.json()
        const { label, imageSrc } = body
        const session = await getCurrentUser()

        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!imageSrc) {
            return new NextResponse("Imagem é necessária", { status: 400 })
        }

        if (!label) {
            return new NextResponse("Valor é necessário", { status: 400 })
        }

        const outdoor = await prismadb.outdoor.update({
            where: {
                id: params.outdoorId
            },
            data: {
                label: label,
                imageSrc: imageSrc
            }
        })

        return NextResponse.json(outdoor)
    }
    catch (error: any) {
        return new NextResponse('Erro interno do servidor', { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { outdoorId: string } }) {
    try {
        const session = await getCurrentUser()
        if (!session) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!params.outdoorId) {
            return new NextResponse('O outdoorId é necessário', { status: 400 })
        }
        const categoryWithThisOutdoor = await prismadb.categorias.findMany({
            where: {
                outdoorId: params.outdoorId
            }
        })
        if (categoryWithThisOutdoor.length > 0) {
            return new NextResponse("Não é possível apagar, pois o outdoor está sendo usado em alguma categoria", { status: 400 })
        }
        const outdoor = await prismadb.outdoor.delete({
            where: {
                id: params.outdoorId
            }
        })
        return NextResponse.json(outdoor)
    }
    catch (error: any) {
        return new NextResponse("Erro interno do servidor", { status: 500 })
    }
}