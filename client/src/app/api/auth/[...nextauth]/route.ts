import NextAuth, {type NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import {compare} from "bcrypt";

interface Usertype {
    id: number;     username: string;     email: string;     password: string;     createdAt: Date;     updatedAt: Date;
}

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

                const emailFinded = await prisma.user.findUnique({
                    where: {
                        email: credentials?.EmailOrUsername
                    },
                });

                const usernameFinded = await prisma.user.findUnique({
                    where: {
                        username: credentials?.EmailOrUsername
                    },
                });

                if(!usernameFinded && !emailFinded) {
                    return null
                }

                const u = usernameFinded ?? emailFinded
                const user = u as Usertype

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

            return {
                token: null
            }
        }
    }
}

export default NextAuth(authOptions);