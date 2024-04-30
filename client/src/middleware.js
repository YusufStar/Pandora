import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(async function middleware(req) {
    // Kullanıcının bilgisi alınır.
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Sayfanın URL'ini alıyoruz, ve izin verdiğimiz path ile eşleşip eşleşmediğini kontrol ediyoruz.
    const currentPath = req.nextUrl.pathname;

    console.log(session)

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
        "/carpet",
        "/product",
        "/product/:id",
        "/product/:id*",
    ],
};