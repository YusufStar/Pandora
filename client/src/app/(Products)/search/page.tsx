'use client';

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import BasicCard from "@/components/cards/BasicCard";

const SearchPage = () => {
    const [products, setProducts] = useState<null | any[]>(null);
    const [filterItems, setFilterItems] = useState<null | any[]>([]);
    const [activeFilters, setActiveFilters] = useState<null | any>({});
    const [expanded, setExpanded] = useState<any>({});

    const params = useSearchParams();
    const search = params.get("s") as string;

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
                    title: 'Markalar',
                    field: 'brand',
                    items: getUniqueBrandsWithCounts()
                }
            ]);

            setActiveFilters({
                'brand': {}
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

    const applyFiltersWithProducts = () => {
        //@ts-ignore
        if (Object.keys(activeFilters).length === 0) {
            return products;
        } else {
            //@ts-ignore
            let filteredProducts = [...products];
            for (const filterField in activeFilters) {
                const activeFilterValues = Object.keys(activeFilters[filterField]).filter(key => activeFilters[filterField][key]);
                filteredProducts = filteredProducts.filter(product => activeFilterValues.includes(product[filterField]));
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
                            Search
                        </div>
                    </div>

                    <div className="template-list desktop-sort-template items-center">
                        Desktop sort list
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
                                                                console.log('prev:', prev);
                                                                console.log('filter.field:', filter.field);
                                                                console.log('item.field:', item.field);

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