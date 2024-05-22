import {getServerSession} from 'next-auth/next'
import {NextResponse} from 'next/server'
import {authOptions} from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    const allProducts = await prisma.product.findMany({
        where: {},
        include: {
            banner: true,
            sizes: true,
            category: true,
            features: true,
            usage: true
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
        return NextResponse.json({
            authenticated: !!session,
            data: data.filter((dt) => Number(dt.id) === Number(productId))[0]
        })
    } else {
        return NextResponse.json({authenticated: !!session, data: data})
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {newData} = await request.json()

    const data = await prisma.product.create({
        data: {
            brand: newData.brand,
            discount: Number(newData.discount),
            description: newData.description,
            price: Number(newData.price),
            banner: {
                connect: {
                    id: newData.banner.id,
                }
            },
            images: newData.images,
            defaultSizeId: newData.sizes[0],
            sizes: {
                connect: newData.sizes.map((size: number) => {
                    return {id: size}
                }),
            },
            category: {
                connect: newData.category.map((ct: number) => {
                    return {id: ct}
                }),
            },
            features: {
                connect: newData.features.map((feature: number) => {
                    return {id: feature}
                }),
            },
            usage: {
                connect: newData.usage.map((usage: number) => {
                    return {id: usage}
                }),
            },
            colors: newData.colors
        }
    })

    return NextResponse.json({authenticated: !!session, data: data})
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }

    const {id} = await request.json()

    const deletedProduct = await prisma.product.delete({
        where: {
            id: id
        }
    })

    return NextResponse.json({authenticated: !!session, data: deletedProduct})
}