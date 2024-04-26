"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { ReactNode } from "react";
import Slider from "react-slick";

const HorizontalList = ({
  children,
  header,
  settings,
}: {
  children: ReactNode[];
  header?: string;
  settings: any;
}) => {
  if (!header)
    return (
      <Slider
          arrows
          nextArrow={<ChevronRight color="#000" size={20} />}
          prevArrow={<ChevronLeft color="#000" size={20} />}
          {...settings}
      >
        {children}
      </Slider>
    );

  return (
    <div className="container px-4 products-slider-main mx-auto relative pb-8 pt-8">
      <h2 className="uppercase flex justify-center text-[30px] lg:text-[40px] text-center text-black font-medium pb-4">
        {header}
      </h2>

      <Slider
          arrows
          nextArrow={<ChevronRight color="#000" size={20} />}
          prevArrow={<ChevronLeft color="#000" size={20} />}
        {...settings}
      >
        {children}
      </Slider>
    </div>
  );
};

export default HorizontalList;
