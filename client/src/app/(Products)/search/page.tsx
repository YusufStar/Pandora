'use client';

import { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import BasicCard from "@/components/cards/BasicCard";

const SearchPage = () => {
    const [products, setProducts] = useState<null | any[]>(null);
    const [filterItems, setFilterItems] = useState<null | any[]>([]);
    const [activeFilters, setActiveFilters] = useState<null | any>({});
    const [expanded, setExpanded] = useState<any>({});
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<"fiyat-artan" | "fiyat-azalan" | "indirim-artan" | "indirim-azalan" | "ilk-eklenen" | "son-eklenen" | "default">("default");

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

        setSearch(params.get("s") as string)
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            router.push(`/search?s=${search}`);
        }, 1000);

        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() => {
        if (products) {
            setFilterItems([
                {
                    title: 'Markalar',
                    field: 'brand',
                    items: getUniqueBrandsWithCounts()
                },
                {
                    title: 'Olculer',
                    field: 'sizes',
                    items: getUniqueSizesWithCounts()
                }
            ]);

            setActiveFilters({
                'brand': {},
                'sizes': {}
            })
        }
    }, [products]);

    function onlyUnique(value: any, index: number, array: any[]) {
        return array.indexOf(value) === index;
    }

    const getUniqueBrandsWithCounts = () => {
        if (products && products.length > 0) {
            const uniqueBrands = products.map((product) => product.brand).filter(onlyUnique);

            const brandCounts = uniqueBrands.map((brand) => {
                return {
                    field: brand,
                    count: products.filter((product) => product.brand === brand).length
                };
            });

            return brandCounts;
        } else {
            return [];
        }
    };

    const getUniqueSizesWithCounts = () => {
        if (products && products.length > 0) {
            const uniqueSizes = products.flatMap((product) => product.sizes.map((size: any) => size.dimensions)).filter(onlyUnique);

            const sizesCounts = uniqueSizes.map((size: any) => {
                return {
                    field: size,
                    count: products.filter((product) => {
                        const sizes = product.sizes.map((size: any) => size.dimensions)

                        return sizes.includes(size)
                    }).length
                };
            });

            return sizesCounts;
        } else {
            return [];
        }
    }

    const applyFiltersWithProducts = () => {
        if (Object.keys(activeFilters).length === 0) {
            return products;
        } else {
            // @ts-ignore
            let filteredProducts = [...products];
            for (const filterField in activeFilters) {
                if (Object.values(activeFilters[filterField]).some((x) => x)) {
                    const activeFilterValues = Object.keys(activeFilters[filterField]).filter(key => activeFilters[filterField][key]);
                    filteredProducts = filteredProducts.filter(product => {
                        if (filterField === 'brand') {
                            return activeFilterValues.includes(product[filterField]);
                        } else if (filterField === 'sizes') {
                            return product[filterField].some((size: any) => activeFilterValues.includes(size.dimensions));
                        } else {
                            return true;
                        }
                    });
                } else {
                    filteredProducts = [...products];
                }
            }
            return filteredProducts;
        }
    };

    return (
        <div>
            <div className="container flex flex-col category-products-main mx-auto relative mb-8">
                <div className="flex mb-4 mt-0 sm:mt-4 md:mt-4 lg:mt-4 px-4  items-center  scrolled_list-main">
                    <h1 className={'text-gray-500 text-sm'}></h1>
                </div>

                <div className="flex items-centers flex-col sm:flex-row md:flex-row lg:flex-row">
                    <div className="search-main w-full sm:w-64 md:w-64 lg:w-64 ">
                        <div className="px-4 relative">
                            <input type="text"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                                   className="search-input outline-none"
                                   placeholder="Ne aramıştınız?"/>

                            <span onClick={() => setSearch("")} className="search-icon"><svg stroke="currentColor" fill="currentColor"
                                                                                             stroke-width="0" viewBox="0 0 24 24" height="1em"
                                                                                             width="1em" xmlns="http://www.w3.org/2000/svg"><path
                                fill="none" d="M0 0h24v24H0z"></path><path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></span>
                        </div>
                    </div>

                    <div className="flex desktop-sort-template items-center">
                        <div className="flex flex-wrap w-11/12">
                            <div onClick={() => setSort("fiyat-artan")} className={`sort-item ${sort === "fiyat-artan" ? "active" : "passive"}`}>Fiyat artan</div>
                            <div onClick={() => setSort("fiyat-azalan")} className={`sort-item ${sort === "fiyat-azalan" ? "active" : "passive"}`}>Fiyat azalan</div>
                            <div onClick={() => setSort("indirim-artan")} className={`sort-item ${sort === "indirim-artan" ? "active" : "passive"}`}>İndirim oranı artan</div>
                            <div onClick={() => setSort("indirim-azalan")} className={`sort-item ${sort === "indirim-azalan" ? "active" : "passive"}`}>İndirim oranı azalan</div>
                            <div onClick={() => setSort("ilk-eklenen")} className={`sort-item ${sort === "ilk-eklenen" ? "active" : "passive"}`}>İlk eklenen</div>
                            <div onClick={() => setSort("son-eklenen")} className={`sort-item ${sort === "son-eklenen" ? "active" : "passive"}`}>Son eklenen</div>
                            <div onClick={() => setSort("default")} className={`sort-item ${sort === "default" ? "active" : "passive"}`}>Varsayılan</div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-64 p-4 desktop-filters h-[85vh]">
                        <div className="sticky-filter flex flex-col">
                            {filterItems?.map((filter) => {
                                return (
                                    <div key={filter.title}>
                                    <div onClick={() => {
                                            setExpanded((prev: any) => ({
                                                ...prev,
                                                [filter.title]: !!!prev[filter.title]
                                            }))
                                        }} className="flex justify-between items-center cursor-pointer">
                                            <span className="font-medium text-sm">{filter.title}</span>

                                            <span
                                                className={`${!!expanded[filter.title] ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out`}><svg
                                                stroke="currentColor" fill="currentColor" strokeWidth="0"
                                                viewBox="0 0 24 24" height="20" width="20"
                                                xmlns="http://www.w3.org/2000/svg"><path
                                                d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg></span>
                                        </div>

                                        <AnimatePresence>
                                            {!!expanded[filter.title] && (
                                                <motion.div
                                                    className={'flex flex-wrap gap-1 pt-2 overflow-hidden w-full'}
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: 'auto', opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.3, ease: 'easeInOut'}}>

                                                    {filter?.items.map((item: any, index: number) => {
                                                        return <span onClick={() => {
                                                            setActiveFilters((prev: any) => {
                                                                return {
                                                                    ...prev,
                                                                    [filter.field]: {
                                                                        ...prev[filter.field],
                                                                        [item.field]: !!!prev[filter.field][item.field],
                                                                    }
                                                                };
                                                            });

                                                        }} key={index}
                                                                     style={{
                                                                         backgroundColor: !!activeFilters[filter.field] && !!activeFilters[filter.field][item.field] ? 'rgba(0, 0, 0, 1)' : '',
                                                                         color: !!activeFilters[filter.field] && !!activeFilters[filter.field][item.field] ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
                                                                         fontWeight: !!activeFilters[filter.field] && !!activeFilters[filter.field][item.field] ? 500 : 400,
                                                                     }}
                                                                     className="cursor-pointer mr-2 rounded transition-all duration-200 ease-in-out filter-type-box text-xs">
                                                            <span>{item.field}<span
                                                                className="text-xs text-gray-500"> ( {item.count} )</span>
                                                            </span>
                                                        </span>
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex-1 pb-4 pl-4 pr-4 mt-4">
                        <div>
                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">

                                {products && applyFiltersWithProducts()?.map((product: any, index: number) => <BasicCard
                                    product_data={product} key={index}/>)}
                            </div>
                        </div>

                        <div
                            className="pagination-main mt-12 flex justify-center sm:justify-center md:justify-center lg:justify-center items-center"></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SearchPage;