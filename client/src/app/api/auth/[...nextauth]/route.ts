import NextAuth, {type NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import {compare} from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers : [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                EmailOrUsername: {
                    label: "Email or username",
                    type: "text",
                    placeholder: "Email or username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                }
            },
            // @ts-ignore
            async authorize(credentials){
                if (!credentials?.EmailOrUsername || !credentials.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        OR: [
                            {
                                email: credentials?.EmailOrUsername,
                            },
                            {
                                username: credentials?.EmailOrUsername,
                            }
                        ]
                    }
                })

                if(!user) {
                    return null
                }

                const isValidPassword = await compare(
                    credentials.password,
                    user.password
                )

                if (!isValidPassword) {
                    return null
                }

                return {
                    ...user,
                    randomKey: "Hey this is cool."
                }
            }
        })
    ],
    callbacks: {
        session: ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            }
        },
        jwt: ({token, user}) => {
            if (user) {
                const u = user as unknown as any

                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                }
            }
        }
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};