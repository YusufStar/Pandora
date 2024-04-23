"use client";
import React from "react";
import BasicCard from "@/components/cards/BasicCard";
import HorizontalList from "@/components/sliders/HorizontalList";

const Page = () => {
  const slides = [
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
  ];

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Ekran genişliği 1024px'den küçük olduğunda
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Ekran genişliği 768px'den küçük olduğunda
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Ekran genişliği 480px'den küçük olduğunda
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const image_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="home-slider-main">
        <HorizontalList settings={image_settings}>
          {slides.map((slide, idx) => (
            <img src={slide.url} key={idx} className="w-full object-contain" />
          ))}
        </HorizontalList>
      </div>

      {/* Cok Satanalar */}
      <HorizontalList settings={settings} header="ÇOK SATANLAR">
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={17}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL08C"
          key={1}
        />
        <BasicCard
          bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
          fiyat={3304}
          indirim={10}
          marka="MAJOLİKA"
          description="Modern Desenli Hali Alvin AL48C"
          key={2}
        />
      </HorizontalList>
    </div>
  );
};

export default Page;
