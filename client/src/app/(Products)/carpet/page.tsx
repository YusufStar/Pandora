import BasicCard from "@/components/cards/BasicCard";
import ImageSlider from "@/components/sliders/ImageSlider";
import React from "react";

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

  return (
    <div className="h-full w-full flex flex-col">
      <ImageSlider animate timeout={5000} height={775} slides={slides} />

      {/* Cok Satanalr */}
      <div className="flex flex-col w-full py-8">
        <span className="uppercase mx-auto text-[33px] font-medium">
          ÇOK SATANLAR
        </span>

        <div className="flex gap-4 container mx-auto relative py-8">
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
            indirim={0}
            marka="MAJOLİKA"
            description="Modern Desenli Hali Alvin AL07C"
            key={3}
          />
          <BasicCard
            bannerImage="https://cdn.myikas.com/images/07703dd0-5fb6-4ac4-b95d-c17f586baf2c/8a8ebb55-995b-4b5e-a73d-f06ffed94061/540/dsc00822-cmr.webp"
            fiyat={3304}
            indirim={0}
            marka="MAJOLİKA"
            description="Modern Desenli Hali Alvin AL06C"
            key={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
