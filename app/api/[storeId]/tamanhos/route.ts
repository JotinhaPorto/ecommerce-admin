import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await request.json()
        const { name, value } = body
        const session = await getCurrentUser()

        // status 400 → o servidor não entendeu ou processou a req, pois pode conter dados inválidos, parametros em falta ou incorretos, url mal formada, autenticação ou autorização falha 
        // status 403 → o servidor entendeu o pedido, mas não autoriza
        if (!session?.id) {
            return new NextResponse("Não autenticado", { status: 403 })
        }
        if (!name) {
            return new NextResponse("Nome é necessário", { status: 400 })
        }
        if (!value) {
            return new NextResponse("Valor é necessário", { status: 400 })
        }
        if (!params.storeId) {
            return new NextResponse("Id da loja é necessário", { status: 400 })
        }
        const size = await prismadb.size.create({
            data: {
                name: name,
                value: value,
                storeId: params.storeId
            }
        })
        return NextResponse.json(size)

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
            return new NextResponse("Store id is required", { status: 400 });
        }

        const sizes = await prismadb.size.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(sizes);
    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
};