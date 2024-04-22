import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
