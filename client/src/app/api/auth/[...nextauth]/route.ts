import NextAuth from "next-auth";
import authOptions from "@/lib/auth-options";


// Export a default function for the NextAuth route
const route = NextAuth(authOptions)
export {route as GET, route as PATH}
