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

    const featuresData = await prisma.features.findMany({
        where: {}
    })

    return NextResponse.json({authenticated: !!session, data: featuresData})
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {title} = await request.json()

    const newFeatures = await prisma.features.create({
        data: {
            title: title
        }
    })

    return NextResponse.json({authenticated: !!session, data: newFeatures})
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {id} = await request.json()

    const deletedFeatures = await prisma.features.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({authenticated: !!session, data: deletedFeatures})
}