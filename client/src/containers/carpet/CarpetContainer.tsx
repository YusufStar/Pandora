"use client";
import React, {useEffect, useState} from "react";
import BasicCard from "@/components/cards/BasicCard";
import HorizontalList from "@/components/sliders/HorizontalList";
import useDeviceType from "@/hooks/DeviceType";
import CarpetInfos from "./_components/CarpetInfos";

const CarpetContainer = () => {
    const [products, setProducts] = useState(null);
    const {isMobile} = useDeviceType();

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

    const getData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
            mode: "no-cors",
        }).then((x) => x.json())
        setProducts(response.data)
    }

    useEffect(() => {
        getData()
    }, [])

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
                   {
                       // @ts-ignore
                       products && products.filter((product) => product.discount > 0).sort((a, b) => b.discount - a.discount).slice(0, 19).map((product, product_index) => (
                           <BasicCard
                               product_data={product}
                               key={product_index}
                           />
                       ))}
            </HorizontalList>

            <HorizontalList settings={settings} header="YENİ ÇIKANLAR">
                {/* Yeni Cikanlar */}
                {
                    // @ts-ignore
                    products && products.filter((product) => product.discount === 0).map((product, product_index) => (
                    <BasicCard
                        product_data={product}
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

            <CarpetInfos/>

            <div className="container mx-auto  mt-8 mb-8 px-4 py-4">
                <div className="grid grid-cols-3 features mx-auto w-full sm:w-3/4">
                    <div className="flex flex-col gap-4 !items-center !justify-center">
                        <img
                            alt="features"
                            src="https://cdn.myikas.com/images/theme-images/03310641-9822-4fc3-927d-983f85d1baea/image_3840.webp"
                            className="w-9 h-9 object-contain lg:w-12 lg:h-12 mx-auto"
                            loading="lazy"
                        />
                        <span
                            className="text-black text-[12px] h-8 lg:text-base lg:h-6 break-words overflow-hidden text-center">Kredi kartına 12 ay taksit</span>
                    </div>
                    <div className="flex flex-col gap-4 !items-center !justify-center">
                        <img
                            alt="features"
                            src="https://cdn.myikas.com/images/theme-images/95b7493f-c23b-4f3a-9082-a5eff8d27b18/image_180.webp"
                            className="w-9 h-9 object-contain lg:w-12 lg:h-12 mx-auto"
                            loading="lazy"
                        />
                        <span
                            className="text-black text-[12px] h-8 lg:text-base lg:h-6 break-words overflow-hidden text-center">Ücretsiz Kargo</span>
                    </div>
                    <div className="flex flex-col gap-4 !items-center !justify-center">
                        <img
                            alt="features"
                            src="https://cdn.myikas.com/images/theme-images/9a98ee6b-dd5a-48a3-8f0e-654dd1bfa07f/image_180.webp"
                            className="w-9 h-9 object-contain lg:w-12 lg:h-12 mx-auto"
                            loading="lazy"
                        />
                        <span
                            className="text-black text-[12px] h-8 lg:text-base lg:h-6 break-words overflow-hidden text-center">14 gün içinde iade ve değişim</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarpetContainer;
