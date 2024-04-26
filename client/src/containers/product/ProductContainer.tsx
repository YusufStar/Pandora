import HorizontalList from "@/components/sliders/HorizontalList";
import React from "react";
import Footer from "../_components/Footer";

type Props = {
  product_id: any;
};

const ProductContainer = ({ product_id }: Props) => {
  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
      <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 !max-h-[950px]">
          <div className="!max-h-[950px] product-detail-page-slider-main col-span-2 px-0 sm:px-4 md:px-4 lg:px-4">
            <div className="image-slider product-detail-page-slider relative">
              <HorizontalList settings={settings}>
                <img
                  className="h-[600px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/87a86d1c-5643-4a94-9d95-7afd5b13f1aa/3840/10.webp"
                />
                <img
                  className="h-[600px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/c9a9f378-5d60-4f16-8976-4322de0f0a35/3840/dsc00823-cmr.webp"
                />
                <img
                  className="h-[600px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/639ce7b0-468f-4e45-b573-b960200e4733/3840/dsc00834-cmr.webp"
                />
                <img
                  className="h-[600px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/d1b7306c-ea7a-49d0-acda-78ecf910843d/3840/dsc00837-cmr.webp"
                />
              </HorizontalList>
            </div>
          </div>

          <div className="!max-h-[950px] product-detail-page-detail-box relative col-span-2 sm:col-span-2 md:col-span-2 px-4 lg:col-span-1 xl:col-span-1">
            <div className="flex justify-between items-center">
              <div className="product-name-main w-11/12">
                <a
                  className="uppercase text-[#232323ff] text-base font-bold"
                  href="#"
                >
                  MAJOLIKA
                </a>
                <h1 className="text-[#232323ff] text-lg font-normal product-name">
                  Modern Desenli Halı Alvin AL01A
                </h1>
              </div>
            </div>
            <div className="product-detail-page-detail-price-box flex items-center mt-4 mb-4">
              <div className="price-main relative font-bold text-lg">
                <div className="discount-price-main flex flex-row">
                  <div
                    className="discount-percent !font-bold"
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      color: "rgb(255, 255, 255)",
                      fontWeight: 500,
                      borderRadius: "0px",
                    }}
                  >
                    %17
                  </div>

                  <div className="flex discount-price flex-col">
                    <span className="text-base text-[#aaaaaa]">₺ 3,384.00</span>
                    <span className="text-[#232323]">₺ 2,820.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 mb-6">
              <div className="mb-4">
                <div className="mb-2 variant-type">ebat</div>
                <div className="items-center product-detail-page-variants flex flex-wrap">
                  <div className="items-center product-detail-page-variants flex flex-wrap ">
                    <div className="py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer selected-circle  rounded-full">
                      <span className="variant-name">80 x 150</span>
                    </div>
                    <div className="py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer   rounded-full">
                      <span className="variant-name">100 x 200</span>
                    </div>
                    <div className="py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer   rounded-full">
                      <span className="variant-name">120 x 180</span>
                    </div>
                    <div className="py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer   rounded-full">
                      <span className="variant-name">80 x 300</span>
                    </div>
                    <div className="py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer   rounded-full">
                      <span className="variant-name">100 x 300</span>
                    </div>
                    <div className="py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer   rounded-full">
                      <span className="variant-name">160 x 230</span>
                    </div>
                    <div className="py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer   rounded-full">
                      <span className="variant-name">200 x 290</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 product-detail-page-buy-box mt-12 mb-2 flex-col">
              <div className="flex">
                <div className="flex mr-2 product-detail-quantity-boxes">
                  <div className="product-detail-quantity-box ">
                    <svg
                      stroke="#000"
                      fill="#000"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="15"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 11h14v2H5z"></path>
                    </svg>
                  </div>

                  <div className="product-detail-quantity">
                    <input
                      type="number"
                      value={1}
                      className="quantity-input bg-white text-black"
                    />
                  </div>

                  <div className="product-detail-quantity-box ">
                    <svg
                      stroke="#000"
                      fill="#000"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="15"
                      width="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
                  </div>
                </div>

                <button className="add-to-cart flex-1 stock rounded-none">
                  SEPETE EKLE
                </button>
              </div>
            </div>
            <div className="text-[#000000ff] bg-[#ffe8e8ff] rounded-none buy-now-button mb-2">
              Hemen Al
            </div>
            <div className="p-0 bg-white product-detail-page-easy-refund">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-full gap-4 sm:gap-0 md:gap-0 lg:gap-0">
                <div className="easy-refund">
                  <span
                    className="easy-refund-image"
                    style={{ width: "31px", height: "31px" }}
                  >
                    <img
                      alt="features"
                      src="https://cdn.myikas.com/images/theme-images/8c598eed-e489-4d01-978d-220680b3581b/image_3840.webp"
                      decoding="async"
                      data-nimg="responsive"
                      style={{ objectFit: "cover" }}
                      sizes="31px"
                    />
                  </span>
                  <span style={{ color: "#000000ff" }}>
                    Kredi kartına 12 aya kadar taksit
                  </span>
                </div>
                <div className="easy-refund">
                  <span
                    className="easy-refund-image"
                    style={{ width: "31px", height: "31px" }}
                  >
                    <img
                      alt="features"
                      src="https://cdn.myikas.com/images/theme-images/fb342df5-abc4-45e4-af5f-84d5b7128760/image_3840.webp"
                      decoding="async"
                      data-nimg="responsive"
                      style={{ objectFit: "cover" }}
                      sizes="31px"
                    />
                  </span>
                  <span style={{ color: "#000000ff" }}>
                    14 gün içinde iade ve değişim
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductContainer;