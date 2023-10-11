import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import bcrypt from 'bcrypt'
import prisma from "./prisma"
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthUser } from "@/types/AuthUser"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    } 
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error('Usuário não encontrado')
                }

                const isCorretPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isCorretPassword) {
                    throw new Error('Senha incorreta')
                }

                return user
            }


        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.user = user
            return token
        },
        session: async ({ session, token }) => {
            if (token) session.user = token.user as AuthUser
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}