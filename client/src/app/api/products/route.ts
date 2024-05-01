import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import {authOptions} from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }

    const allProducts = await prisma.product.findMany({
        where: {},
        include: {
            banner: true,
            sizes: true
        }
    })

    const allSizes = await prisma.size.findMany({})

    const data = allProducts.map((pd) => {
        return {
            ...pd,
            defaultSizeId: allSizes.filter((size) => size.id === pd.defaultSizeId)[0],
        }
    })

    const productId = new URL(request.url).searchParams.get("productId")

    if (productId) {
        // @ts-ignore
        return NextResponse.json({ authenticated: !!session, data: data.filter((dt) => Number(dt.id) === Number(productId))[0] })
    } else {
        return NextResponse.json({ authenticated: !!session, data: data })
    }
}