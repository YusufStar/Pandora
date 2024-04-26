"use client";
import React from "react";
import BasicCard from "@/components/cards/BasicCard";
import HorizontalList from "@/components/sliders/HorizontalList";
import useDeviceType from "@/hooks/DeviceType";
import Footer from "../_components/Footer";
import CarpetInfos from "./_components/CarpetInfos";

const CarpetContainer = () => {
  const { isMobile } = useDeviceType();

  const slides = !isMobile
    ? [
        {
          url: "https://cdn.myikas.com/images/theme-images/697b1269-40f4-488a-acc2-efdb1737d841/image_2560.webp",
        },
        {
          url: "https://cdn.myikas.com/images/theme-images/78880df6-1e15-461a-b3e6-6165d1ee5bb9/image_2560.webp",
        },
        {
          url: "https://cdn.myikas.com/images/theme-images/7751a4ee-9e7f-4d8f-a7a7-b8d2f4eba70f/image_2560.webp",
        },
        {
          url: "https://cdn.myikas.com/images/theme-images/6e27bedc-c3d6-423b-9a13-e3e9a9ed63dd/image_2560.webp",
        },
      ]
    : [
        {
          url: "https://cdn.myikas.com/images/theme-images/9982be83-22b0-4f75-a569-61bf221b3b0a/image_720.webp",
        },
        {
          url: "https://cdn.myikas.com/images/theme-images/b4201063-5c8b-43d4-98eb-05cdcdf8a8aa/image_720.webp",
        },
        {
          url: "https://cdn.myikas.com/images/theme-images/2eb52b3d-c875-4f1e-b360-ee628abfd418/image_540.webp",
        },
        {
          url: "https://cdn.myikas.com/images/theme-images/0f8fe305-7115-4ae0-b987-76ab77e3e9fb/image_720.webp",
        },
      ];

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 3440, // Ekran genişliği 1024px'den küçük olduğunda
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Ekran genişliği 1024px'den küçük olduğunda
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Ekran genişliği 480px'den küçük olduğunda
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const image_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const mock_products = [
    {
      banner:
        "https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp",
      price: 3384,
      discount: 17,
      brand: "Majolika",
      description: "Modern Desenli Halı Alvin AL08C",
    },
    {
      banner:
        "https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/b898d63c-4474-43c4-9a4c-f16cca53ca47/540/dsc00819-cmr.webp",
      price: 3384,
      discount: 17,
      brand: "Majolika",
      description: "Modern Desenli Halı Alvin AL00A",
    },
    {
      banner:
        "https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/c9a9f378-5d60-4f16-8976-4322de0f0a35/3840/dsc00823-cmr.webp",
      price: 3384,
      discount: 17,
      brand: "Majolika",
      description: "Modern Desenli Halı Alvin AL01A",
    },
    {
      banner:
        "https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/e2b9a808-35eb-4efa-b908-c4ab67f95a54/3840/dsc00824-cmr.webp",
      price: 3384,
      discount: 17,
      brand: "Majolika",
      description: "Modern Desenli Halı Alvin AL05A",
    },
    {
      banner:
        "https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/3e0af4d2-6181-4a87-8e5d-7ae245b99bbd/3840/alvin---al04a---krem-a.webp",
      price: 3384,
      discount: 17,
      brand: "Majolika",
      description: "Modern Desenli Halı Alvin AL04A",
    },
  ];

  return (
    <div className="h-full w-full flex flex-col">
      <div className={`home-slider-main`}>
        <HorizontalList settings={image_settings}>
          {slides.map((slide, idx) => (
            <img
              alt=""
              src={slide.url}
              key={idx}
              className={`object-contain`}
            />
          ))}
        </HorizontalList>
      </div>

      {/* Cok Satanalar */}
      <HorizontalList settings={settings} header="ÇOK SATANLAR">
        {mock_products.map((product, product_index) => (
          <BasicCard
            id={product_index}
            src={product.banner}
            fiyat={product.price}
            indirim={product.discount}
            marka={product.brand}
            description={product.description}
            key={product_index}
          />
        ))}
      </HorizontalList>

      <HorizontalList settings={settings} header="YENİ ÇIKANLAR">
        {/* Yeni Cikanlar */}
        {mock_products.reverse().map((product, product_index) => (
          <BasicCard
            id={product_index}
            src={product.banner}
            fiyat={product.price}
            indirim={product.discount}
            marka={product.brand}
            description={product.description}
            key={product_index}
          />
        ))}
      </HorizontalList>

      {/* Olcunuze gore hlai sec kismi */}
      <div className="container mx-auto relative pb-8 pt-8">
        <h2 className="uppercase flex justify-center text-[30px] lg:text-[40px] w-full break-words overflow-hidden text-center text-black font-medium pb-4">
          Ölçüye Göre Halını Seç
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex px-4 lg:px-6 flex-col items-center justify-center">
            <img
              draggable={false}
              className="!w-[125px] lg:!w-[165px] object-contain"
              src="https://percdn.com/f/864625/b3NhVUoyVTArYkI4Tmk4Z1RvTTZKYms9/a/80x150-cm-95534650.webp"
              alt=""
            />

            <span className="text-black text-base w-full text-center font-medium pt-4">
              80x150 cm
            </span>
          </div>
          <div className="flex px-4 lg:px-6 flex-col items-center justify-center">
            <img
              draggable={false}
              className="!w-[125px] lg:!w-[165px] object-contain"
              src="https://percdn.com/f/864625/b3NhVUoyVTArYkI4Tmk4Z1RvTTZKYms9/a/120x180-cm-55158321.webp"
              alt=""
            />

            <span className="text-black text-base w-full text-center font-medium pt-4">
              120x180 cm
            </span>
          </div>
          <div className="flex px-4 lg:px-6 flex-col items-center justify-center">
            <img
              draggable={false}
              className="!w-[125px] lg:!w-[165px] object-contain"
              src="https://percdn.com/f/864625/b3NhVUoyVTArYkI4Tmk4Z1RvTTZKYms9/a/160x230-cm-82702929.webp"
              alt=""
            />

            <span className="text-black text-base w-full text-center font-medium pt-4">
              160x230 cm
            </span>
          </div>
          <div className="flex px-4 lg:px-6 flex-col items-center justify-center">
            <img
              draggable={false}
              className="!w-[125px] lg:!w-[165px] object-contain"
              src="https://percdn.com/f/864625/b3NhVUoyVTArYkI4Tmk4Z1RvTTZKYms9/a/200x200-cm-16434192.webp"
              alt=""
            />

            <span className="text-black text-base w-full text-center font-medium pt-4">
              200x200 cm
            </span>
          </div>
          <div className="flex px-4 lg:px-6 flex-col items-center justify-center">
            <img
              draggable={false}
              className="!w-[125px] lg:!w-[165px] object-contain"
              src="https://percdn.com/f/864625/b3NhVUoyVTArYkI4Tmk4Z1RvTTZKYms9/a/200x290-cm-4311029.webp"
              alt=""
            />

            <span className="text-black text-base w-full text-center font-medium pt-4">
              200x290 cm
            </span>
          </div>
          <div className="flex px-4 lg:px-6 flex-col items-center justify-center">
            <img
              draggable={false}
              className="!w-[125px] lg:!w-[165px] object-contain"
              src="https://percdn.com/f/864625/b3NhVUoyVTArYkI4Tmk4Z1RvTTZKYms9/a/240x340-cm-26775125.webp"
              alt=""
            />

            <span className="text-black text-base w-full text-center font-medium pt-4">
              240x340 cm
            </span>
          </div>
        </div>
      </div>

      <CarpetInfos />

      <div className="container mx-auto  mt-8 mb-8 px-4 py-4">
        <div className="grid grid-cols-3 features mx-auto w-full sm:w-3/4">
          <div className="flex flex-col gap-4 !items-center !justify-center">
            <img
              alt="features"
              src="https://cdn.myikas.com/images/theme-images/03310641-9822-4fc3-927d-983f85d1baea/image_3840.webp"
              className="object-cover w-12 h-12 mx-auto"
              loading="lazy"
            />
            <span className="text-black">Kredi kartına 12 ay taksit</span>
          </div>
          <div className="flex flex-col gap-4 !items-center !justify-center">
            <img
              alt="features"
              src="https://cdn.myikas.com/images/theme-images/95b7493f-c23b-4f3a-9082-a5eff8d27b18/image_180.webp"
              className="object-cover w-12 h-12 mx-auto"
              loading="lazy"
            />
            <span className="text-black">Ücretsiz Kargo</span>
          </div>
          <div className="flex flex-col gap-4 !items-center !justify-center">
            <img
              alt="features"
              src="https://cdn.myikas.com/images/theme-images/9a98ee6b-dd5a-48a3-8f0e-654dd1bfa07f/image_180.webp"
              className="object-cover w-12 h-12 mx-auto"
              loading="lazy"
            />
            <span className="text-black">14 gün içinde iade ve değişim</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpetContainer;
