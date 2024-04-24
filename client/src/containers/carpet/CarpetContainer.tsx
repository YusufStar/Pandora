"use client";
import React from "react";
import BasicCard from "@/components/cards/BasicCard";
import HorizontalList from "@/components/sliders/HorizontalList";
import useDeviceType from "@/hooks/DeviceType";
import Footer from "../_components/Footer";

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
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 3440, // Ekran genişliği 1024px'den küçük olduğunda
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Ekran genişliği 1024px'den küçük olduğunda
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550, // Ekran genişliği 768px'den küçük olduğunda
        settings: {
          slidesToShow: 2,
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

  return (
    <div className="h-full w-full flex flex-col">
      <div className={`home-slider-main`}>
        <HorizontalList settings={image_settings}>
          {slides.map((slide, idx) => (
            <img src={slide.url} key={idx} className={`object-contain`} />
          ))}
        </HorizontalList>
      </div>

      {/* Cok Satanalar */}
      <HorizontalList settings={settings} header="ÇOK SATANLAR">
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          src="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/3840/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
      </HorizontalList>

      <div className="container mx-auto  mt-8 mb-8 px-4 py-4">
        <div className="grid grid-cols-3 features mx-auto w-full sm:w-3/4">
          <div className="feature">
            <div className="features-image relative overflow-hidden">
              <img
                alt="features"
                src="https://cdn.myikas.com/images/theme-images/03310641-9822-4fc3-927d-983f85d1baea/image_3840.webp"
                className="absolute top-0 left-0 bottom-0 right-0 object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <span className="text-black">Kredi kartına 12 ay taksit</span>
          </div>
          <div className="feature">
            <div className="features-image relative overflow-hidden">
              <img
                alt="features"
                src="https://cdn.myikas.com/images/theme-images/95b7493f-c23b-4f3a-9082-a5eff8d27b18/image_180.webp"
                className="absolute top-0 left-0 bottom-0 right-0 object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <span className="text-black">Ücretsiz Kargo</span>
          </div>
          <div className="feature">
            <div className="features-image relative overflow-hidden">
              <img
                alt="features"
                src="https://cdn.myikas.com/images/theme-images/9a98ee6b-dd5a-48a3-8f0e-654dd1bfa07f/image_180.webp"
                className="absolute top-0 left-0 bottom-0 right-0 object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <span className="text-black">14 gün içinde iade ve değişim</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarpetContainer;
