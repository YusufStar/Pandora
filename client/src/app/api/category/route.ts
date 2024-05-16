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

    const sizesData = await prisma.category.findMany({
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

    const {title} = await request.json()

    const newCategory = await prisma.category.create({
        data: {
            title: title
        }
    })

    return NextResponse.json({authenticated: !!session, data: newCategory})
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {id} = await request.json()

    const deletedCategory = await prisma.category.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({authenticated: !!session, data: deletedCategory})
}