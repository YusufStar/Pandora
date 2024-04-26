"use client";
import Image from "next/image";
import React, {useState} from "react";
import ProfileIcon from "@/components/icons/Profile";
import BasketIcon from "@/components/icons/Basket";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {ChevronDown} from "lucide-react";

const Navbar = () => {
  const nav_links = [
    {
      title: "Koleksiyonlar",
      subtitles: [
        {
          title: "laila"
        },
        {
          title: "bohem"
        },
        {
          title: "modernho"
        },
        {
          title: "maison"
        },
        {
          title: "trends"
        },
        {
          title: "novel"
        },
        {
          title: "viva"
        },
        {
          title: "orion"
        },
        {
          title: "merci"
        },
        {
          title: "ikon"
        },
        {
          title: "milda"
        },
      ]
    },
    {
      title: "Özellik",
      subtitles: [
        {
          title: "Sıfır Tozuma Halı"
        },
        {
          title: "Tozuma Azaltıcı Halı"
        },
        {
          title: "Leke Tutmaz Halı"
        },
        {
          title: "Pamuk Tabanlı Halı"
        },
        {
          title: "Sürdürülebilir Üretim Halı"
        }
      ]
    },
    {
      title: "Kullanım Alanı",
      subtitles: [
        {
          title: "Mutfak Halısı"
        },
        {
          title: "Oturma Odası Halısı"
        },
        {
          title: "Salon Halısı"
        },
        {
          title: "Yolluk Halısı"
        },
        {
          title: "Çocuk Odası & Genç Odası Halısı"
        }
      ]
    },
    {
      title: "Ölçü",
      subtitles: [
        {
          title: "80 x 150"
        },
        {
          title: "80 x 300"
        },
        {
          title: "100 x 180"
        },
        {
          title: "100 x 200"
        },
        {
          title: "100 x 300"
        },
        {
          title: "120 x 180"
        },
        {
          title: "160 x 230"
        },
        {
          title: "200 x 290"
        },
        {
          title: "240x340"
        }
      ]
    }
  ]
    const [activeLink, setActiveLink] = useState<string>("")

  return (
    <div className="w-full flex flex-col relative shadow-navbar">
      <div className="py-1 w-full bg-black">
        <div className="container px-4 mx-auto w-full flex h-full items-center gap-4">
          <span className="text-gray-200 text-xs">08:00 - 19:00</span>

          <div className="h-4 w-[0.5px] bg-white/50" />

          <span className="text-gray-200 text-xs">0536 707 5369</span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container px-4 mx-auto py-5 w-full flex items-center">
        <Link href={"/carpet"}>
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
        </Link>

        {/* Search Bar */}
        {/*
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
        */}

        {/* Nav Links */}
        <div onMouseLeave={() => setActiveLink("")} className="gap-6 hidden lg:flex items-center flex-1">
          {nav_links.map((nav_link) => (
              <div onMouseEnter={() => setActiveLink(nav_link.title)} className={"flex gap-2 items-center relative cursor-pointer"} key={nav_link.title}>
                <span className="text-sm text-[#080707ff] select-none">{nav_link.title}</span>
                <ChevronDown color={"#080707ff"} size={16}/>

                  <AnimatePresence key={nav_link.title + "persence"}>
                      {activeLink === nav_link.title &&
                          <motion.div key={nav_link.title + "sub"}
                                      initial={{ height: 10}}
                                      animate={{height: "auto"}}
                                      exit={{height: 0, transition: {duration: 0.1}}}
                                      transition={{duration: 0.3, ease: "easeInOut"}}
                                      className={"absolute left-0 top-full w-48 flex flex-col gap-3 z-30 p-4 rounded bg-white shadow-navbar"}
                          >
                              {nav_link.subtitles.map((sublink) => <motion.span initial={{ opacity: 0 }} exit={{opacity: 0, transition: {duration: 0.1} }} animate={{ opacity: 1, transition: {delay: 0.2, duration: 0.2, ease: "easeInOut"} }} key={nav_link.title + "sub" + sublink.title} className="text-[14px] text-[#080707ff] select-none">{sublink.title}</motion.span>)}
                          </motion.div>}
                  </AnimatePresence>
              </div>
          ))}
        </div>

          {/* Buttons */}
          <div className="ml-4 md:ml-12 h-full w-auto flex items-center gap-4">
              <button className="hidden md:flex">
                  <ProfileIcon/>
          </button>

          <div className="h-6 w-[1px] bg-black/20 hidden md:flex" />

          <span className="text-sm font-semibold w-[86px] hidden md:flex">
            Sepet / ₺0,00
          </span>

          <button className="mr-4 md:mr-0">
            <BasketIcon count={0} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;