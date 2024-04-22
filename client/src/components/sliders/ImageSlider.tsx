"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  url: string;
};

type Props = {
  slides: Slide[];
  height: number;
  animate?: boolean;
  timeout?: number;
};

const ImageSlider = ({ slides, height, animate, timeout }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = slide.url;
      });
    });

    Promise.all(imagePromises).catch((error) => {
      console.error("Resim yükleme hatası:", error);
    });
  }, [slides]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (animate) {
      intervalId = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
      }, timeout);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [animate, currentIndex, slides.length, timeout]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={`w-full relative h-[${height}px] group`}>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-cover duration-500"
      />
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out absolute top-[50%] hover:bg-black/50 -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out absolute top-[50%] hover:bg-black/50 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      <div className="flex w-auto h-3 items-center gap-3 absolute bottom-2 left-[50%] translate-x-[-50%]">
        {slides.map((_, index) => (
          <div key={index} onClick={() => setCurrentIndex(index)} className={`${index === currentIndex ? "w-12 bg-black/80" : "w-3 bg-white/50 hover:bg-white/80"} cursor-pointer h-3 rounded-full transition-all duration-500 ease-in-out`} />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
