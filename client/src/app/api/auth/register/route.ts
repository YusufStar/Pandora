import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from "next/server";

const saltRounds = 10;

export async function POST ( req: Request, response: Response) {
        const { username, password, email } = await req.json();

        if (!username || !password || !email) {
            return NextResponse.json({
                type: 'error',
                input: ["all"],
                message: 'All fields are required',
            })
        }

        try {
            // Check if username or email is already in use
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username },
                        { email },
                    ],
                },
            });

            if (existingUser) {
                // If username or email already exists, return error
                return NextResponse.json({
                    type: 'error',
                    input: ["username", "email"],
                    message: 'Username or email is already in use',
                })
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    email,
                },
            });
            return NextResponse.json({
                type: "success",
                message: "Register Successful!",
            });

    } catch (err: any) {
            return NextResponse.json({
                type: 'error',
                input: ["username", "email"],
                message: 'Username or email is already in use',
            })
        }
}