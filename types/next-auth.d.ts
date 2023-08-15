import NextAuth from "next-auth/next";
import { AuthUser } from "./AuthUser";

declare module "next-auth" {
    interface Session {
        user: AuthUser
    }
}