'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const SearchPage = () => {
    const [products, setProducts] = useState<null | any[]>(null);
    const params = useSearchParams()
    const search = params.get("s") as string

    const getData = async () => {
        const response = await fetch(`/api/products`, {
            mode: "no-cors",
        }).then((x) => x.json())
        setProducts(response.data)
    }

    useEffect(() => {
        getData()
    }, [])

    function onlyUnique(value: any, index: number, array: any[]) {
        return array.indexOf(value) === index;
    }

    const getUniqueBrandsWithCounts = () => {
        if (products && products?.length > 0) {
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
    }


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
                            <div className="">
                                <div className="flex justify-between items-center cursor-pointer">
                                    <span className="font-medium text-sm">Tüm markalar</span>

                                    <span><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                               viewBox="0 0 24 24" height="20" width="20"
                                               xmlns="http://www.w3.org/2000/svg"><path
                                        d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 pb-4 pl-4 pr-4 mt-4">
                        <div>
                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                                <span>dsadasa</span>
                                <span>dsadasa</span>
                                <span>dsadasa</span>
                                <span>dsadasa</span>
                                <span>dsadasa</span>
                                <span>dsadasa</span>
                                <span>dsadasa</span>
                            </div>
                        </div>

                        <div
                            className="pagination-main mt-12 flex justify-center sm:justify-center md:justify-center lg:justify-center items-center"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage