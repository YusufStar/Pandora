import "@/styles/globals.css";

import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { ReactNode } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ToastProvider} from "@/containers/Toaster";
import LoadingContainer from "@/components/LoadinContainer";

export const metadata: Metadata = {
  title: "Pandora Hali",
  description: "Pandora Hali ve perde",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen w-full font-sans antialiased")}>
        <LoadingContainer>
            {children}
        </LoadingContainer>
            <ToastProvider />
      </body>
    </html>
  );
}
