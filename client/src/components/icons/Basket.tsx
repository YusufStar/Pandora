"use client"
import React, {useEffect} from "react";
import useBasket, {getProduct} from "@/zustand/useBasket";

const BasketIcon = () => {
    const basket = useBasket();
    const products = getProduct(basket.products)

  return (
    <div className="relative">
      <svg
        stroke="#0a0809ff"
        fill="#0a0809ff"
        strokeWidth="0"
        viewBox="0 0 24 24"
        color="#0a0809ff"
        height="24"
        width="24"
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.00488 7.99951V5.99951C7.00488 3.23809 9.24346 0.999512 12.0049 0.999512C14.7663 0.999512 17.0049 3.23809 17.0049 5.99951V7.99951H20.0049C20.5572 7.99951 21.0049 8.44723 21.0049 8.99951V20.9995C21.0049 21.5518 20.5572 21.9995 20.0049 21.9995H4.00488C3.4526 21.9995 3.00488 21.5518 3.00488 20.9995V8.99951C3.00488 8.44723 3.4526 7.99951 4.00488 7.99951H7.00488ZM7.00488 9.99951H5.00488V19.9995H19.0049V9.99951H17.0049V11.9995H15.0049V9.99951H9.00488V11.9995H7.00488V9.99951ZM9.00488 7.99951H15.0049V5.99951C15.0049 4.34266 13.6617 2.99951 12.0049 2.99951C10.348 2.99951 9.00488 4.34266 9.00488 5.99951V7.99951Z"></path>
      </svg>

      <span className="bg-black absolute flex w-[18px] h-[18px] items-center justify-center text-white top-[-5px] right-[-5px] rounded-full font-bold text-xs">
        {products.length > 0 ? products?.reduce((accumulator, currentProduct) => {
            return accumulator + currentProduct.quantity;
        }, 0) : 0}
      </span>
    </div>
  );
};

export default BasketIcon;
