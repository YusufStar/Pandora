"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProfileIcon from "@/components/icons/Profile";
import BasketIcon from "@/components/icons/Basket";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MenuIcon,
  X,
} from "lucide-react";
import useBasket, { calculateTotalPrice } from "@/zustand/useBasket";
import { nav_links } from "@/zustand/mock-products";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [products, setProducts] = useState<null | any[]>(null);
  const [filterItems, setFilterItems] = useState<null | any[]>([]);
  const [activeLink, setActiveLink] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { push } = useRouter();

  const basket = useBasket();
  const price = calculateTotalPrice(basket.products);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isExpanded]);

  const getData = async () => {
    const response = await fetch(`/api/products`, {
      mode: "no-cors",
    }).then((x) => x.json());
    setProducts(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (products) {
      setFilterItems([
        {
          title: "Markalar",
          field: "brand",
          items: getUniqueBrandsWithCounts(),
        },
        {
          title: "Koleksiyonlar",
          field: "category",
          items: getUniqueCategoryWithCounts(),
        },
        {
          title: "Kullanım Alanlı",
          field: "usage",
          items: getUniqueUsageWithCounts(),
        },
        {
          title: "Ozellik",
          field: "features",
          items: getUniqueFeaturesWithCounts(),
        },
        {
          title: "Ölçü",
          field: "sizes",
          items: getUniqueSizesWithCounts(),
        },
      ]);
    }
  }, [products]);

  function onlyUnique(value: any, index: number, array: any[]) {
    return array.indexOf(value) === index;
  }

  const getUniqueBrandsWithCounts = () => {
    if (products && products?.length > 0) {
      const uniqueBrands = products
        .map((product) => product.brand)
        .filter(onlyUnique);

      const brandCounts = uniqueBrands.map((brand) => {
        return {
          field: brand,
          count: products.filter((product) => product.brand === brand).length,
        };
      });

      return brandCounts;
    } else {
      return [];
    }
  };

  const getUniqueSizesWithCounts = () => {
    if (products && products.length > 0) {
      const uniqueSizes = products
        .flatMap((product) => product.sizes.map((size: any) => size.dimensions))
        .filter(onlyUnique);

      const sizesCounts = uniqueSizes.map((size: any) => {
        return {
          field: size,
          count: products.filter((product) => {
            const sizes = product.sizes.map((size: any) => size.dimensions);

            return sizes.includes(size);
          }).length,
        };
      });

      return sizesCounts;
    } else {
      return [];
    }
  };

  const getUniqueFeaturesWithCounts = () => {
    if (products && products.length > 0) {
      const uniqueFeatures = products
        .flatMap((product) =>
          product.features.map((feature: any) => feature.title)
        )
        .filter(onlyUnique);

      const featuresCounts = uniqueFeatures.map((features: any) => {
        return {
          field: features,
          count: products.filter((product) => {
            const allFeatures = product.features.map(
              (feature: any) => feature.title
            );

            return allFeatures.includes(features);
          }).length,
        };
      });

      return featuresCounts;
    } else {
      return [];
    }
  };

  const getUniqueUsageWithCounts = () => {
    if (products && products.length > 0) {
      const uniqueUsage = products
        .flatMap((product) => product.usage.map((usage: any) => usage.title))
        .filter(onlyUnique);

      const usageCounts = uniqueUsage.map((usage: any) => {
        return {
          field: usage,
          count: products.filter((product) => {
            const sizes = product.usage.map((usage: any) => usage.title);

            return sizes.includes(usage);
          }).length,
        };
      });

      return usageCounts;
    } else {
      return [];
    }
  };

  const getUniqueCategoryWithCounts = () => {
    if (products && products.length > 0) {
      const uniqueCategory = products
        .flatMap((product) => product.category.map((ct: any) => ct.title))
        .filter(onlyUnique);

      const categoryCounts = uniqueCategory.map((ct: any) => {
        return {
          field: ct,
          count: products.filter((product) => {
            const category = product.category.map((ct: any) => ct.title);

            return category.includes(ct);
          }).length,
        };
      });

      return categoryCounts;
    } else {
      return [];
    }
  };

  return (
    <div className="w-full flex flex-col relative shadow-navbar">
      <AnimatePresence key={"mobile-menu"}>
        {isExpanded && (
          <motion.div
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className={"z-50 fixed inset-0"}
          >
            <motion.div
              onClick={() => setIsExpanded(false)}
              className="overlay absolute w-screen h-screen bg-black opacity-20 z-30 flex-col"
            />
            <motion.div
              exit={{ x: "-100%", opacity: 0 }}
              initial={{ x: "-10px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05, ease: "easeInOut", duration: 0.15 }}
              className="panel absolute w-full z-40 h-full left-0 max-w-md overflow-hidden bg-white slide-top-enter-done"
            >
              <div className="flex items-center w-full border-b px-4 py-5">
                <button
                  className={"cursor-default"}
                  onClick={() => setIsExpanded(false)}
                >
                  <X size={24} />
                </button>

                <span className={"font-extrabold ml-auto text-sm"}>
                  ÜYE GİRİŞİ
                </span>

                <div className={"w-[0.25px] h-4 bg-black mx-2"} />

                <span className={"font-extrabold text-sm"}>KAYIT OL</span>
              </div>

              <div className="flex flex-col h-full overflow-y-auto py-4 overflow-x-hidden">
                {isExpanded && activeLink === "" ? (
                  <>
                    {filterItems?.map(({ title, items }, index) => (
                      <>
                        <div
                          onClick={() => setActiveLink(title)}
                          className={
                            "flex hover:bg-black/10 transition-all duration-200 px-4 py-2.5 gap-2 items-center relative cursor-pointer"
                          }
                          key={title}
                        >
                          <span className="text-sm text-[#080707ff] select-none">
                            {title}
                          </span>
                          <ChevronRight
                            className={"ml-auto"}
                            color={"#080707ff"}
                            size={20}
                          />
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => setActiveLink("")}
                      className={
                        "flex hover:bg-black/10 transition-all duration-200 px-4 py-2.5 gap-2 items-center relative cursor-pointer"
                      }
                      key={"back"}
                    >
                      <ChevronLeft color={"#080707ff"} size={18} />
                      <span className="text-sm text-[#080707ff] select-none">
                        {activeLink}
                      </span>
                    </div>
                    {filterItems
                      ?.filter((nav) => nav.title === activeLink)[0]
                      .items?.map(
                        ({
                          field,
                          count,
                        }: {
                          count: string;
                          field: string;
                        }) => (
                          <>
                            <div
                              onClick={() => {
                                setIsExpanded(false);
                                push(`/search?s=${field}`);
                              }}
                              className={
                                "flex hover:bg-black/10 transition-all duration-200 px-4 py-2.5 gap-2 items-center relative cursor-pointer"
                              }
                              key={field}
                            >
                              <span className="text-sm text-[#080707] select-none">
                                {field}
                              </span>

                              <span className="text-white ml-auto text-xs font-semibold flex items-center justify-center w-5 h-5 bg-black rounded-md">
                                {count}
                              </span>
                            </div>
                          </>
                        )
                      )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-1 w-full bg-black hidden lg:block">
        <div className="lg:container px-4 mx-auto w-full flex h-full items-center gap-4">
          <span className="text-gray-200 text-xs">08:00 - 19:00</span>

          <div className="h-4 w-[0.5px] bg-white/50" />

          <span className="text-gray-200 text-xs">0536 707 5369</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:container px-4 mx-auto py-5 w-full flex items-center"
      >
        <button
          className={"block lg:hidden cursor-default"}
          onClick={() => setIsExpanded(true)}
        >
          <MenuIcon size={24} color={"#080707ff"} className={"mr-2"} />
        </button>

        <Link href={"/carpet"} className={"mr-auto lg:mr-0"}>
          <Image
            src="/images/logo.png"
            width={150}
            height={30.47}
            quality={100}
            alt="logo"
            decoding="async"
            draggable="false"
            className="mr-6 object-bottom"
          />
        </Link>

        {/* Nav Links */}
        <div
          onMouseLeave={() => setActiveLink("")}
          className="gap-6 hidden lg:flex items-center flex-1"
        >
          {filterItems?.map(({ title, items }, index) => (
            <div
              onMouseEnter={() => setActiveLink(title)}
              className={
                "flex hover-interstellar gap-2 items-center relative cursor-pointer"
              }
              key={index}
            >
              <span className="text-sm text-[#080707ff] select-none">
                {title}
              </span>
              <ChevronDown
                className={
                  activeLink === title
                    ? "rotate-180 transition-all duration-150 ease-in-out"
                    : "rotate-0 transition-all duration-150 ease-in-out"
                }
                color={"#080707ff"}
                size={16}
              />

              <AnimatePresence key={title + "persence"}>
                {activeLink === title && (
                  <motion.div
                    key={title + "sub"}
                    initial={{ height: 50 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0, transition: { duration: 0.1 } }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className={
                      "absolute left-0 top-full w-48 flex rounded flex-col gap-3 z-30 p-2 bg-white shadow-navbar"
                    }
                  >
                    {items.map(
                      ({ field, count }: { count: string; field: string }) => (
                        <motion.span
                          onClick={() => {
                            push(`/search?s=${field}`);
                          }}
                          initial={{ opacity: 0 }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.1 },
                          }}
                          animate={{
                            opacity: 1,
                            transition: {
                              delay: 0.1,
                              duration: 0.2,
                              ease: "easeInOut",
                            },
                          }}
                          key={title + "sub" + field}
                          className="text-[14px] rounded font-medium hover:bg-black/100 transition-all duration-150 ease-in-out hover:text-white w-full flex items-center relative text-[#080707] select-none p-2"
                        >
                          {field}

                          <span className="absolute text-white right-2 text-xs font-semibold flex items-center justify-center w-5 h-5 bg-black rounded-md">
                            {count}
                          </span>
                        </motion.span>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="h-full w-full max-w-xl flex items-center justify-end gap-4">
          {/*
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        push(`/search?s=${(e.target as any)[0].value as string}`)
                    }} className={"flex items-center w-full relative max-w-sm gap-2"}>
                        <Input className={"max-w-md w-full focus-visible:!ring-0 !ring-0"}/>
                        <SearchIcon className={"absolute shrink-0 right-4"}/>
                    </form>
                    */}

          <button>
            <ProfileIcon />
          </button>

          <div className="h-6 w-[1px] bg-black/20 hidden md:flex" />

          <span className="text-sm font-semibold w-auto text-nowrap hidden md:flex">
            Sepet / {price}
          </span>

          <Link href={"/basket"}>
            <BasketIcon />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
