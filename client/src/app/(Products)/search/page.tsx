"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BasicCard from "@/components/cards/BasicCard";
import { cmToSquareMeter } from "@/zustand/useBasket";
import { X } from "lucide-react";

const SearchPage = () => {
  const [products, setProducts] = useState<null | any[]>(null);
  const [filterItems, setFilterItems] = useState<null | any[]>([]);
  const [activeFilters, setActiveFilters] = useState<null | any>({});
  const [search, setSearch] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [sort, setSort] = useState<
    | "fiyat-artan"
    | "fiyat-azalan"
    | "indirim-artan"
    | "indirim-azalan"
    | "ilk-eklenen"
    | "son-eklenen"
    | "default"
  >("default");

  const params = useSearchParams();
  const router = useRouter();

  const getData = async () => {
    const response = await fetch(`/api/products`, {
      mode: "no-cors",
    }).then((x) => x.json());
    setProducts(response.data);
  };

  useEffect(() => {
    getData();
  }, [params]);

  useEffect(() => {
    if (search && search !== "") {
      const delay = setTimeout(() => {
        router.push(`/search?s=${search}`);
      }, 1000);

      return () => clearTimeout(delay);
    }
  }, [search]);

  useEffect(() => {
    if (products) {
      setActiveFilters({
        brand: {},
        sizes: {},
      });
    }
  }, [products]);

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
  }, [products, activeFilters]);

  function onlyUnique(value: any, index: number, array: any[]) {
    return array.indexOf(value) === index;
  }

  const getUniqueBrandsWithCounts = () => {
    const fltrd_prdtcs = applyFiltersWithProducts();
    if (fltrd_prdtcs && fltrd_prdtcs.length > 0) {
      const uniqueBrands = fltrd_prdtcs
        .map((product) => product.brand)
        .filter(onlyUnique);

      const brandCounts = uniqueBrands.map((brand) => {
        return {
          field: brand,
          count: fltrd_prdtcs.filter((product) => product.brand === brand)
            .length,
        };
      });

      return brandCounts;
    } else {
      return [];
    }
  };

  const getUniqueSizesWithCounts = () => {
    const fltrd_prdtcs = applyFiltersWithProducts();
    if (fltrd_prdtcs && fltrd_prdtcs.length > 0) {
      const uniqueSizes = fltrd_prdtcs
        .flatMap((product) => product.sizes.map((size: any) => size.dimensions))
        .filter(onlyUnique);

      const sizesCounts = uniqueSizes.map((size: any) => {
        return {
          field: size,
          count: fltrd_prdtcs.filter((product) => {
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
    const fltrd_prdtcs = applyFiltersWithProducts();
    if (fltrd_prdtcs && fltrd_prdtcs.length > 0) {
      const uniqueFeatures = fltrd_prdtcs
        .flatMap((product) =>
          product.features.map((feature: any) => feature.title)
        )
        .filter(onlyUnique);

      const featuresCounts = uniqueFeatures.map((features: any) => {
        return {
          field: features,
          count: fltrd_prdtcs.filter((product) => {
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
    const fltrd_prdtcs = applyFiltersWithProducts();
    if (fltrd_prdtcs && fltrd_prdtcs.length > 0) {
      const uniqueUsage = fltrd_prdtcs
        .flatMap((product) => product.usage.map((usage: any) => usage.title))
        .filter(onlyUnique);

      const usageCounts = uniqueUsage.map((usage: any) => {
        return {
          field: usage,
          count: fltrd_prdtcs.filter((product) => {
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
    const fltrd_prdtcs = applyFiltersWithProducts();
    if (fltrd_prdtcs && fltrd_prdtcs.length > 0) {
      const uniqueCategory = fltrd_prdtcs
        .flatMap((product) => product.category.map((ct: any) => ct.title))
        .filter(onlyUnique);

      const categoryCounts = uniqueCategory.map((ct: any) => {
        return {
          field: ct,
          count: fltrd_prdtcs.filter((product) => {
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

  const sortProducts = (products: any[], sortType: string) => {
    switch (sortType) {
      case "fiyat-artan":
        return products.sort((a, b) => {
          return (
            //@ts-ignore
            cmToSquareMeter(a.defaultSizeId.dimensions) * a.price -
            //@ts-ignore
            cmToSquareMeter(b.defaultSizeId.dimensions) * b.price
          );
        });
      case "fiyat-azalan":
        return products.sort((a, b) => {
          return (
            //@ts-ignore
            cmToSquareMeter(b.defaultSizeId.dimensions) * b.price -
            //@ts-ignore
            cmToSquareMeter(a.defaultSizeId.dimensions) * a.price
          );
        });
      case "indirim-artan":
        return products.sort((a, b) => a.discount - b.discount);
      case "indirim-azalan":
        return products.sort((a, b) => b.discount - a.discount);
      default:
        return products;
    }
  };

  const applyFiltersWithSortedProducts = () => {
    const filteredProducts = applyFiltersWithProducts();
    return sortProducts(filteredProducts as any, sort);
  };

  const applyFiltersWithProducts = () => {
    if (Object.keys(activeFilters).length === 0) {
      return products;
    } else {
      // @ts-ignore
      let filteredProducts = [...products];
      for (const filterField in activeFilters) {
        if (Object.values(activeFilters[filterField]).some((x) => x)) {
          const activeFilterValues = Object.keys(
            activeFilters[filterField]
          ).filter((key) => activeFilters[filterField][key]);
          filteredProducts = filteredProducts.filter((product) => {
            if (filterField === "brand") {
              return activeFilterValues.includes(product[filterField]);
            } else if (filterField === "sizes") {
              return product[filterField].some((size: any) =>
                activeFilterValues.includes(size.dimensions)
              );
            } else if (filterField === "category") {
              return product[filterField].some((ct: any) =>
                activeFilterValues.includes(ct.title)
              );
            } else if (filterField === "usage") {
              return product[filterField].some((usage: any) =>
                activeFilterValues.includes(usage.title)
              );
            } else if (filterField === "features") {
              return product[filterField].some((feature: any) =>
                activeFilterValues.includes(feature.title)
              );
            }
          });
        }
      }
      return filteredProducts?.filter((dt) => {
        const searchTerm = (params.get("s") as string).toLowerCase();
        // Tüm dt özelliklerinde arama yap
        return Object.values(dt).some((value: any) => {
          console.log(value);
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm);
          } else if (Array.isArray(value)) {
            // Eğer değer bir array ise, array'in içeriğinde arama yap
            return value.some(({ title }: any) =>
              typeof title === "string"
                ? title.toLowerCase().includes(searchTerm)
                : false
            );
          }
          return false;
        });
      });
    }
  };

  return (
    <div>
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
              exit={{ x: "100%", opacity: 0 }}
              initial={{ x: "10px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05, ease: "easeInOut", duration: 0.3 }}
              className="panel absolute w-full z-40 h-full right-0 flex flex-col max-w-md overflow-hidden bg-white slide-top-enter-done"
            >
              <div className="w-full flex items-center justify-between px-4 pt-4">
                <span className="font-bold text-lg">Filtrele</span>
                <X onClick={() => setIsExpanded(false)} />
              </div>

              <div className="w-full border mt-4" />

              <div className="h-full overflow-y-auto flex flex-col w-full">
                {filterItems?.map((filter) => {
                  return (
                    <div key={filter.title} className="p-4 w-full border-b">
                      <div className="flex justify-between items-center cursor-pointer mb-1">
                        <span className="font-medium text-sm">
                          {filter.title}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2 overflow-hidden w-full">
                        {filter?.items.map((item: any, index: number) => {
                          return (
                            <span
                              onClick={() => {
                                setActiveFilters((prev: any) => {
                                  return {
                                    ...prev,
                                    [filter.field]: {
                                      ...(prev[filter.field] || {}), // Check if prev[filter.field] exists, otherwise use an empty object
                                      [item.field]:
                                        !!!prev[filter.field]?.[item.field], // Use optional chaining to avoid accessing undefined
                                    },
                                  };
                                });
                              }}
                              key={index + "-sub"}
                              style={{
                                backgroundColor:
                                  !!activeFilters[filter.field] &&
                                  !!activeFilters[filter.field][item.field]
                                    ? "rgba(0, 0, 0, 1)"
                                    : "",
                                color:
                                  !!activeFilters[filter.field] &&
                                  !!activeFilters[filter.field][item.field]
                                    ? "rgba(255, 255, 255, 1)"
                                    : "rgba(0, 0, 0, 1)",
                              }}
                              className="cursor-pointer mr-2 rounded transition-all duration-200 ease-in-out filter-type-box text-xs"
                            >
                              <span>
                                {item.field}
                                <span className="text-xs text-gray-500">
                                  {" "}
                                  ( {item.count} )
                                </span>
                              </span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container flex flex-col category-products-main mx-auto relative mb-8">
        <div className="flex mb-4 mt-0 sm:mt-4 md:mt-4 lg:mt-4 px-4 items-center scrolled_list-main"></div>

        <div className="hidden lg:flex items-centers flex-col sm:flex-row md:flex-row lg:flex-row">
          <div className="search-main w-full sm:w-64 md:w-64 lg:w-64 ">
            <div className="px-4 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input outline-none"
                placeholder={params?.get("s") ?? "Ne aramıştınız?"}
              />

              <span onClick={() => setSearch("")} className="search-icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </span>
            </div>
          </div>

          <div className="flex desktop-sort-template items-center">
            <div className="flex flex-wrap w-11/12">
              <div
                onClick={() => setSort("fiyat-artan")}
                className={`sort-item ${
                  sort === "fiyat-artan" ? "active" : "passive"
                }`}
              >
                Fiyat artan
              </div>
              <div
                onClick={() => setSort("fiyat-azalan")}
                className={`sort-item ${
                  sort === "fiyat-azalan" ? "active" : "passive"
                }`}
              >
                Fiyat azalan
              </div>
              <div
                onClick={() => setSort("indirim-artan")}
                className={`sort-item ${
                  sort === "indirim-artan" ? "active" : "passive"
                }`}
              >
                İndirim oranı artan
              </div>
              <div
                onClick={() => setSort("indirim-azalan")}
                className={`sort-item ${
                  sort === "indirim-azalan" ? "active" : "passive"
                }`}
              >
                İndirim oranı azalan
              </div>
              <div
                onClick={() => setSort("default")}
                className={`sort-item ${
                  sort === "default" ? "active" : "passive"
                }`}
              >
                Varsayılan
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:hidden w-full px-4">
            <div className="w-full h-[56px] p-4 items-center flex mb-4 rounded-md bg-[#f4f4f4]">
              <button
                className="flex items-center gap-2 w-full justify-center cursor-pointer"
                onClick={() => setIsExpanded(true)}
              >
                <span className="relative">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="#484848"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </span>
                <span className="ml-2 text-[#484848]">Filtre</span>
              </button>

              <button className="flex items-center gap-2 w-full justify-center cursor-pointer">
                <span className="relative">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    color="#484848"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"></path>
                  </svg>
                </span>
                <span className="ml-2 text-[#484848]">Sırala</span>
              </button>
            </div>
          </div>

          <div className="w-64 p-4 hidden lg:flex desktop-filters h-[85vh] max-h-[85vh]">
            <div className="sticky-filter w-full h-full flex flex-col gap-4">
              {filterItems?.map((filter) => {
                return (
                  <div
                    key={filter.title}
                    className="max-h-[17vh] h-auto overflow-y-auto w-full"
                  >
                    <div className="flex justify-between items-center cursor-pointer mb-2">
                      <span className="font-medium text-sm">
                        {filter.title}
                      </span>

                      <span
                        className={`transition-all duration-300 ease-in-out rotate-180`}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
                        </svg>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2 overflow-hidden w-full">
                      {filter?.items.map((item: any, index: number) => {
                        return (
                          <span
                            onClick={() => {
                              setActiveFilters((prev: any) => {
                                return {
                                  ...prev,
                                  [filter.field]: {
                                    ...(prev[filter.field] || {}), // Check if prev[filter.field] exists, otherwise use an empty object
                                    [item.field]:
                                      !!!prev[filter.field]?.[item.field], // Use optional chaining to avoid accessing undefined
                                  },
                                };
                              });
                            }}
                            key={index + "-sub"}
                            style={{
                              backgroundColor:
                                !!activeFilters[filter.field] &&
                                !!activeFilters[filter.field][item.field]
                                  ? "rgba(0, 0, 0, 1)"
                                  : "",
                              color:
                                !!activeFilters[filter.field] &&
                                !!activeFilters[filter.field][item.field]
                                  ? "rgba(255, 255, 255, 1)"
                                  : "rgba(0, 0, 0, 1)",
                            }}
                            className="cursor-pointer mr-2 rounded transition-all duration-200 ease-in-out filter-type-box text-xs"
                          >
                            <span>
                              {item.field}
                              <span className="text-xs text-gray-500">
                                {" "}
                                ( {item.count} )
                              </span>
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 pb-4 pl-4 pr-4 mt-4">
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {products &&
                  applyFiltersWithSortedProducts()?.map(
                    (product: any, index: number) => (
                      <BasicCard
                        list={true}
                        product_data={product}
                        key={index}
                      />
                    )
                  )}
              </div>
            </div>

            <div className="pagination-main mt-12 flex justify-center sm:justify-center md:justify-center lg:justify-center items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
