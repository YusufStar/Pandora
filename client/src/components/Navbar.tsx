"use client";
import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
import ProfileIcon from "./icons/Profile";
import BasketIcon from "./icons/Basket";
import SearchIcon from "./icons/Search";

const Navbar = () => {
  return (
    <div className="w-full flex flex-col relative">
      <div className="py-1 w-full bg-black">
        <div className="max-w-4xl mx-auto w-full flex h-full items-center gap-4">
          <span className="text-gray-200 text-xs">08:00 - 19:00</span>

          <div className="h-4 w-[0.5px] bg-white/50" />

          <span className="text-gray-200 text-xs">0536 707 5369</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-5 w-full flex items-center border-b border-b-black/20">
        <Image
          src="/images/logo.png"
          width={150}
          height={30.47}
          quality={100}
          alt="logo"
          decoding="async"
          draggable="false"
          className="mr-6 hidden md:flex"
        />

        {/* Search Bar */}
        <div className="w-full ml-4 flex relative items-center h-9">
          <input
            type="text"
            placeholder="Hayalinizde ki urunu Arayin..."
            className="w-full placeholder:text-black/70 text-base focus:shadow-md hover:shadow-md transition-shadow duration-300 ease-in-out font-medium px-4 pl-12 h-full rounded outline-none border border-black/20"
          />

          <span className="absolute left-4">
            <SearchIcon />
          </span>
        </div>

        {/* Buttons */}
        <div className="ml-4 md:ml-12 h-full w-auto flex items-center gap-4">
          <button className="hidden md:flex">
            <ProfileIcon />
          </button>

          <div className="h-6 w-[1px] bg-black/20 hidden md:flex" />

          <span className="text-sm font-semibold w-[86px] hidden md:flex">
            Sepet / ₺0,00
          </span>

          <button className="mr-4 md:mr-0">
            <BasketIcon count={0} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
7;
