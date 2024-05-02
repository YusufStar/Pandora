'use client'

const SearchPage = () => {
    return (
        <div>
            <div className="container flex flex-col category-products-main mx-auto relative mb-8">
                <div className="flex mb-4 mt-0 sm:mt-4 md:mt-4 lg:mt-4 px-4  items-center  scrolled_list-main">
                    <h1 className={'text-gray-500 text-sm'}></h1>
                </div>

                <div className="flex items-centers flex-col sm:flex-row md:flex-row lg:flex-row">
                    <div className="search-main w-full sm:w-64 md:w-64 lg:w-64 ">
                        Search
                    </div>

                    <div className="template-list desktop-sort-template items-center">
                        Desktop sort list
                    </div>
                </div>

                <div className="flex">
                    <div className="w-64 p-4 desktop-filters">
                        <div className="sticky-filter">
                            Filters
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