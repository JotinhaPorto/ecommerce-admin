import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await request.json()
        const { label, imageSrc } = body
        const session = await getCurrentUser()

        // status 400 → o servidor não entendeu ou processou a req, pois pode conter dados inválidos, parametros em falta ou incorretos, url mal formada, autenticação ou autorização falha 
        // status 403 → o servidor entendeu o pedido, mas não autoriza
        if (!session?.id) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!imageSrc) {
            return new NextResponse("Imagem é necessária", { status: 400 })
        }
        if (!label) {
            return new NextResponse("Valor é necessário", { status: 400 })
        }
        if (!params.storeId) {
            return new NextResponse("Id da loja é necessário", { status: 400 })
        }
        const outdoor = await prismadb.outdoor.create({
            data: {
                label: label,
                imageSrc: imageSrc,
                storeId: params.storeId
            }
        })
        return NextResponse.json(outdoor)

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
        if (!params.storeId) {
            return new NextResponse("Store é necessário", { status: 400 });
        }

        const outdoor = await prismadb.outdoor.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(outdoor);
    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
};