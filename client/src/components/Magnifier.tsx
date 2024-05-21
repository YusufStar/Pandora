"use client";
import React, { useState } from "react";

type Props = {
  imageUrl: string;
  key: number;
};

const Magnifier = ({ imageUrl, key }: Props) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  function handleMouseHover(e: React.MouseEvent) {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setPosition({ x, y });

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  }

  return (
    <div key={key} className="relative w-full flex justify-center">
      <div
        className="w-fit h-fit relative"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseHover}
      >
        <img
          className="h-[350px] sm:block hidden w-fit lg:h-[800px] object-contain"
          src={imageUrl}
        />

        {showMagnifier && (
          <div
            className="hidden sm:block"
            style={{
              position: "absolute",
              left: `${cursorPosition.x - 50}px`,
              top: `${cursorPosition.y - 50}px`,
              pointerEvents: "none",
            }}
          >
            <div
              className="w-[100px] h-[100px] border-4 border-white/25 rounded"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: `${position.x}% ${position.y}%`,
                scale: 2,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Magnifier;
