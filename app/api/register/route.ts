import prismadb from '@/libs/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()

    const { name, email, password } = body

    const hashedPassword = await bcrypt.hash(password, 12)

    const exist = await prismadb.user.findFirst({
        where: {
            email: email
        }
    })

    if (exist) {
        throw new Error('Esse e-mail já existe')
    }

    const newUser = await prismadb.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(newUser)
}