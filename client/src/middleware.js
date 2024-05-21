import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export default withAuth(async function middleware(req) {
    // Kullanıcının bilgisi alınır.
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Sayfanın URL'ini alıyoruz, ve izin verdiğimiz path ile eşleşip eşleşmediğini kontrol ediyoruz.
    const currentPath = req.nextUrl.pathname;

    if (!session) {
        if (currentPath !== "/login" && currentPath !== "/register") {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
        } else {
            return NextResponse.next();
        }
    }
});

export const config = {
    matcher: [
        "/",
        "/search",
        "/carpet",
        "/product",
        "/product/:id",
        "/product/:id*",
        "/dashboard/product",
        "/dashboard/category",
        "/dashboard/size",
        "/dashboard/feature",
        "/checkout",
    ],
};