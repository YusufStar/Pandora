import {getServerSession} from 'next-auth/next'
import {NextResponse} from 'next/server'
import {authOptions} from "@/lib/auth-options";
import prisma from "@/lib/prisma";

/*!
model Orders {
  id         Int    @id @default(autoincrement())
  totalPrice Int
  status     Status @default(WAIT)

  products Product[]

  user   User? @relation(fields: [userId], references: [id])
  userId Int?
}
!*/

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({authenticated: false, data: []})
    }

    const AllOrders = await prisma.orders.findMany({
        where: {
            //@ts-ignore
            userId: session.user.id
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
            products: products
        }
    })

    return NextResponse.json({authenticated: !!session, data: newOrders})
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