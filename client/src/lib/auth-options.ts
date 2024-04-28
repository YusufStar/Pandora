// Import necessary modules and dependencies
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

// Define the UserType interface
interface UserType {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the NextAuth options
const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
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
            // Authorize function
            // @ts-ignore
            async authorize(credentials) {
                // Validation checks
                if (!credentials?.EmailOrUsername || !credentials.password) {
                    return null;
                }

                // Find user by email
                const emailFinded = await prisma.user.findUnique({
                    where: {
                        email: credentials?.EmailOrUsername
                    },
                });

                // Find user by username
                const usernameFinded = await prisma.user.findUnique({
                    where: {
                        username: credentials?.EmailOrUsername
                    },
                });

                // If user not found by email or username, return null
                if (!usernameFinded && !emailFinded) {
                    return null;
                }

                // Determine user object based on which search was successful
                const user = usernameFinded ?? emailFinded as UserType;

                // Compare passwords
                const isValidPassword = await compare(
                    credentials.password,
                    user.password
                );

                // If password is invalid, return null
                if (!isValidPassword) {
                    return null;
                }

                // Return user object with additional data
                return {
                    ...user,
                    randomKey: "Hey this is cool."
                };
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as any;

                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                };
            }

            return {
                token: null
            };
        }
    }
};

export default authOptions