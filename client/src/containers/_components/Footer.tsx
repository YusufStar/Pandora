"use client";
import Payments from "@/components/icons/Payments";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container flex flex-col justify-between mx-auto my-8 px-4 w-full h-fit">
        <div className="h-fit"></div>
        <div className="flex w-full items-center justify-between">
          <h3>
            <span className="text-[14px] font-medium text-white/50">
              © 2023 MAJOLİKA
            </span>
          </h3>
          <Payments />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
