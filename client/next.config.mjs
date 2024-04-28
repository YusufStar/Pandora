/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        ServerComponentsExternalPackages: ["@prisma/client", "bcrypt"]
    }
};

export default nextConfig;
