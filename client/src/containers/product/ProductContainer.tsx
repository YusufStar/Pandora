"use client"
import HorizontalList from "@/components/sliders/HorizontalList";
import React, {useState} from "react";
import useDeviceType from "@/hooks/DeviceType";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

type Props = {
  product_id: any;
};

const ProductContainer = ({ product_id }: Props) => {
  const sizes = ["80 x 150", "100 x 200", "120 x 180", "80 x 300", "100 x 300", "160 x 230", "200 x 290"];

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const {isMobile} = useDeviceType();
  const settings = {
    dots: isMobile,
    arrows: !isMobile,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
      <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <div className="product-detail-page-slider-main col-span-2 px-0 sm:px-4 md:px-4 lg:px-4">
            <div className="!max-h-[400px] lg:!max-h-[800px] image-slider product-detail-page-slider relative">
              <HorizontalList settings={settings}>
                <img
                  className="h-[350px] lg:h-[800px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/87a86d1c-5643-4a94-9d95-7afd5b13f1aa/3840/10.webp"
                />
                <img
                  className="h-[350px] lg:h-[800px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/c9a9f378-5d60-4f16-8976-4322de0f0a35/3840/dsc00823-cmr.webp"
                />
                <img
                  className="h-[350px] lg:h-[800px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/639ce7b0-468f-4e45-b573-b960200e4733/3840/dsc00834-cmr.webp"
                />
                <img
                  className="h-[350px] lg:h-[800px] object-contain"
                  alt=""
                  src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/d1b7306c-ea7a-49d0-acda-78ecf910843d/3840/dsc00837-cmr.webp"
                />
              </HorizontalList>
            </div>
          </div>

          <div className="product-detail-page-detail-box relative col-span-2 sm:col-span-2 md:col-span-2 px-4 lg:col-span-1 xl:col-span-1">
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
                  {sizes.map((size, index) => (
                      <div
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-1 px-4 mr-2 mb-2 transition-all duration-200 ease-in-out variant-types relative border-transparent border-2 cursor-pointer rounded-full ${selectedSize === size ? "selected-circle" : ""}`}>
                        <span className="variant-name">80 x 150</span>
                      </div>
                  ))}
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
                      strokeWidth="0"
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
                      strokeWidth="0"
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

            <div className="w-full h-8"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 my-12 mt-8 px-4">
          <Tabs defaultValue={"detail"}>
            <TabsList className={"mx-auto w-fit"}>
              <TabsTrigger className={"font-medium text-[15px] pb-1"} value={"detail"}>Urun Aciklamasi</TabsTrigger>
              <TabsTrigger  className={"font-medium text-[15px] pb-1"} value={"feature"}>Ozellikler</TabsTrigger>
            </TabsList>

            <TabsContent value={"detail"} className={"flex flex-col w-full max-w-3xl mx-auto mt-8 sm:mt-10 md:mt-10 lg:mt-10"}>
              <ul className={"[&_li]:text-[12px] lg:[&_li]:text-[14px] [&_li]:mb-2"}>
                <li>-Halınız özel yöntemlerle üretilmiş polvis iplikler ile akrilik çöken ipliklerden oluşmuştur. Yüksek
                  sıklık ve kısa hav boyundan dolayı “tozuma” yok denecek kadar azdır.
                </li>
                <li>-Salonlarınızda ve evinizin her alanında kullanabileceğiniz yüksek ilmek sayısına sahip
                  halılardır.
                </li>
                <li>-Halınızın tabanında pamuk atkı kullanılmıştır. Selülozik elyafların doğal yapısından dolayı
                  halınızın eninde bir miktar daralma olabilir.
                </li>
                <li>-Halı üzerine dökülen sıvı leke yapıcılarını zaman kaybetmeden kuru bez veya kağıt havlu ile
                  vakumlayarak alın.
                </li>
                <li>-Halı üzerine dökülen katı leke yapıcılarını spatula ile halıdan tamamen temizleyin.</li>
                <li>-Halınızı kullanmadığınız durumlarda rulo yapıp yatay olarak muhafaza edin, asla katlamayın,
                  güneşten ve rutubetten koruyun.
                </li>
                <li>-Kimyasal ağartıcılar kullanmayın, profesyonel yardım isteyin.</li>
              </ul>

              <p className={"my-2.5 text-[12px] lg:text-[14px]"}>+Akrilik</p>

              <p className={"text-[12px] lg:text-[14px]"}>‘‘Majolika Halı Üretim Tesislerinde Üretilmiştir.’’</p>
            </TabsContent>
            <TabsContent value={"feature"} className={"flex flex-col items-center w-full max-w-3xl mx-auto mt-8 sm:mt-10 md:mt-10 lg:mt-10"}>
              <ul className={"[&_li]:text-[12px] lg:[&_li]:text-[14px] [&_li]:mb-2 list-disc"}>
                <li>İplik türü: özel efekt polyester, micro polyester</li>
                <li>Tozuma olmaz</li>
                <li>Cotton base</li>
                <li>Sürdürülebilir üretim</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
};

export default ProductContainer;
