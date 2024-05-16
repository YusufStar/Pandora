"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const paths = [
    {
      title: "Product",
      path: "/dashboard/product",
    },
    {
      title: "Size",
      path: "/dashboard/size",
    },
    {
      title: "Category",
      path: "/dashboard/category",
    },
    {
      title: "Features",
      path: "/dashboard/features",
    },
  ];

  return (
    <div className={"flex h-screen overflow-hidden w-full"}>
      <div className="flex flex-col gap-2 max-w-xs h-full overflow-y-auto overflow-x-hidden border-r w-full px-4">
        <div className="w-full border-b py-4 mb-4">
          <Image
            src="/images/logo.png"
            width={150}
            height={30.47}
            quality={100}
            alt="logo"
            decoding="async"
            draggable="false"
            className="w-[120px] lg:w-[150px]"
          />
        </div>

        {paths.map((item, i) => (
          <Link
            className={cn(
              "border rounded p-2 text-sm transition-all hover:opacity-75 duration-300 ease-in-out font-medium",
              pathname === item.path ? "bg-[#dedede] shadow" : "bg-white"
            )}
            key={i}
            href={item.path}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
};

export default DashboardLayout;
