import {getServerSession} from 'next-auth/next'
import {NextResponse} from 'next/server'
import {authOptions} from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {
        url,
        file_name,
        file_extension,
    } = await request.json()

    const newFile = await prisma.file.create({
        data: {
            url: url,
            file_name: file_name,
            file_extension: file_extension
        }
    })

    return NextResponse.json({authenticated: !!session, data: newFile})
}