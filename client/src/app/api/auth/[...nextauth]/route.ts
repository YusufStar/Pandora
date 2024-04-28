import NextAuth from "next-auth";
import authOptions from "@/lib/auth-options";

const route = NextAuth(authOptions)
export {route as GET, route as PATH}
