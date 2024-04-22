import BasicCard from "@/components/cards/BasicCard";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Buraya Slider Gelecek */}
      <div className="w-full relative h-[772.969px]">
        <Image
          src="/images/test01.webp"
          fill
          quality={100}
          alt=""
          decoding="async"
          draggable="false"
        />
      </div>

      {/* Cok Satanalr */}
      <div className="flex flex-col w-full py-8">
        <span className="uppercase mx-auto text-4xl font-medium">ÇOK SATANLAR</span>
        
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
