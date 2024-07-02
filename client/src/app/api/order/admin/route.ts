import {getServerSession} from 'next-auth/next'
import {NextResponse} from 'next/server'
import {authOptions} from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({authenticated: false, data: []})
    }

    const AllOrders = await prisma.orders.findMany({
        include: {
            user: true,
            products: true,
        }
    })

    return NextResponse.json({authenticated: !!session, data: AllOrders})
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {totalPrice, products} = await request.json()
    const userId = (session.user as any).id

    const newOrders = await prisma.orders.create({
        data: {
            totalPrice: totalPrice,
            products: {
                connect: products.map(({id}: any) => {
                    return {id: id}
                }),
            },
            status: "WAIT",
            user: {
                connect: {
                    id: userId
                }
            }
        },
        include: {
            products: true
        }
    })

    await prisma.basket.deleteMany({
        where: {
            userId: userId
        }
    })

    console.log(newOrders)

    return NextResponse.json({authenticated: !!session, data: newOrders})
}