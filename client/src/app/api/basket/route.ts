import {getServerSession} from 'next-auth/next'
import {NextResponse} from 'next/server'
import {authOptions} from "@/lib/auth-options";
import prisma from "@/lib/prisma";

function cmToSquareMeter(dimensions: string): number {
    const [width, height] = dimensions.split('x').map(dimension => parseFloat(dimension.trim()));

    return (width / 100) * (height / 100);
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const basketData = await prisma.basket.findMany({
        where: {
            user: {
                id: (session.user as any).id
            }
        },
        include: {
            product: {
                include: {
                    sizes: true,
                    banner: true,
                }
            },
            user: true,
            size: true
        }
    })

    return NextResponse.json({authenticated: !!session, data: basketData})
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {productId, quantity, sizeId} = await request.json()
    const userId = (session.user as any).id

    const newDataBasket = await prisma.basket.create({
        data: {
            size: {
                connect: {
                    id: sizeId
                }
            },
            user: {
                connect: {
                    id: userId
                }
            },
            product: {
                connect: {
                    id: productId,
                }
            },
            quantity: quantity
        },
        include: {
            product: {
                include: {
                    sizes: true,
                    banner: true,
                }
            },
            user: true,
            size: true,
        }
    })

    return NextResponse.json({authenticated: !!session, data: newDataBasket})
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {basketId} = await request.json()
    const userId = (session.user as any).id

    const deletedBasket = await prisma.basket.delete({
        where: {
            user: {
                id: userId
            },
            id: basketId
        }
    })

    return NextResponse.json({authenticated: !!session, data: deletedBasket})
}