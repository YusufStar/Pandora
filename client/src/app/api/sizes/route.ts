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

    const sizesData = await prisma.size.findMany({
        where: {}
    })

    return NextResponse.json({authenticated: !!session, data: sizesData})
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {dimensions} = await request.json()
    const userId = (session.user as any).id

    const newSizeBasket = await prisma.size.create({
        data: {
          dimensions: dimensions
        }
    })

    return NextResponse.json({authenticated: !!session, data: newSizeBasket})
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {sizeId} = await request.json()
    const userId = (session.user as any).id

    const deletedSize = await prisma.size.delete({
        where: {
            id: sizeId
        }
    })

    return NextResponse.json({authenticated: !!session, data: deletedSize})
}