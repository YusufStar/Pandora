import {getServerSession} from 'next-auth/next'
import {NextResponse} from 'next/server'
import {authOptions} from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const UsageData = await prisma.usage.findMany({
        where: {}
    })

    return NextResponse.json({authenticated: !!session, data: UsageData})
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {title} = await request.json()

    const newUsage = await prisma.usage.create({
        data: {
            title: title
        }
    })

    return NextResponse.json({authenticated: !!session, data: newUsage})
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {id} = await request.json()

    const deletedUsage = await prisma.usage.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({authenticated: !!session, data: deletedUsage})
}