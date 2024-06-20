"use client";

import React, { useEffect } from "react";
import useBasket, {
  calculateTotalPrice,
  cmToSquareMeter,
  formatCurrency,
  useDiscount,
} from "@/zustand/useBasket";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const BasketPage = () => {
  const { setBasket, products } = useBasket();
  const totalPrice = calculateTotalPrice(products);

  const getData = async () => {
    await fetch(`/api/basket`, {
      mode: "no-cors",
    })
      .then((x) => x.json())
      .then(({ data }) => {
        setBasket(data);
      });
  };

  const handleDeleteBasket = async (id: number) => {
    await fetch(`/api/basket`, {
      body: JSON.stringify({ basketId: id }),
      method: "DELETE",
    }).then(async () => {
      await getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={"h-fit w-full"}>
      <div className="container mx-auto mt-8 mb-4 pb-8">
        <div className="flex px-4 items-center justify-between">
          <h1 className={"font-bold text-xl tracking-wider"}>
            Sepetim
            {"(" + products.length + ")"}
          </h1>
        </div>

        <div className="grid grid-cols-6 gap-10 px-4">
          <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-4 xl:col-span-4 ">
            {products.map(({ product, size, quantity, id }, index) => {
              return (
                <div
                  key={index}
                  className={"w-full border-b py-4 relative h-fit"}
                >
                  <div className="absolute top-4 right-0 cursor-pointer group">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          className={
                            "group-hover:stroke-red-500 group-hover:fill-red-500 transition-all duration-200"
                          }
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          color="#000"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15 2H9c-1.103 0-2 .897-2 2v2H3v2h2v12c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8h2V6h-4V4c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm8 16H7V8h10v12z"></path>
                        </svg>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Bu ürünü silmek istediğinizden emin misiniz?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu ürün sepetinizden silinecektir.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteBasket(id as number)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-20 h-fit relative">
                      <img src={product.banner.url} alt="" />
                    </div>

                    <div className="flex flex-col justify-between w-full">
                      <div className="flex flex-col justify-between h-full pl-6 w-full">
                        <div>
                          <Link
                            className="hover:underline text-xs sm:text-sm font-normal"
                            href={`/product/${product.id}`}
                          >
                            {product.description}
                          </Link>

                          <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                            <span className="variant-type">Fiyat: </span>

                            <span className="variant-name">
                              {
                                // @ts-ignore
                                formatCurrency(
                                  Number(
                                    // @ts-ignore
                                    cmToSquareMeter(size?.dimensions).toFixed(2)
                                  ) * product.price
                                )
                              }
                            </span>
                          </div>

                          <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                            <span className="variant-type"> ebat: </span>
                            <span className="variant-name">
                              {size.dimensions}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="basket-quantity-main flex flex-row justify-between pl-6 items-center">
                        <div className="flex items-center">
                          <span
                            className={
                              "text-[#9da5af] text-[13px] sm:text-[14px]"
                            }
                          >
                            Adet:
                          </span>
                          <span
                            style={{ color: "rgb(8, 8, 8)" }}
                            className={"ml-1 text-[14px]"}
                          >
                            {quantity}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          {!product.discount ||
                            (product.discount !== 0 && (
                              <span
                                className={
                                  "text-[#8a8b94] text-[13px] sm:text-[14px] line-through"
                                }
                              >
                                {
                                  // @ts-ignore
                                  formatCurrency(
                                    // @ts-ignore
                                    cmToSquareMeter(size.dimensions) *
                                      product.price *
                                      quantity
                                  )
                                }
                              </span>
                            ))}

                          <span
                            className={
                              "text-[13px] sm:text-[14px] font-medium text-black"
                            }
                          >
                            {
                              // @ts-ignore
                              formatCurrency(
                                useDiscount(
                                  Number(
                                    // @ts-ignore
                                    cmToSquareMeter(size?.dimensions).toFixed(2)
                                  ) *
                                    product.price *
                                    quantity,
                                  product.discount
                                ) as number
                              )
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2 ">
            <div className="basket-summary">
              <h3>Sipariş Özeti</h3>
              <div className="sub-total flex justify-between items-center">
                <span>Ara Toplam</span>
                <span>{totalPrice}</span>
              </div>

              <div className="final-total mt-2 flex justify-between items-center">
                <span>Toplam</span>
                <span>{totalPrice}</span>
              </div>

              <span
                className="mt-12 mb-4 flex text-sm"
                style={{ color: "rgb(99, 99, 99)" }}
              >
                Kargo sonraki adımda hesaplanacaktır.{" "}
              </span>

              <Link href={"/checkout"}>
                <div className="basket-checkout-btn items-center mb-6 flex">
                  <span className="mr-3">ALIŞVERİŞİ TAMAMLA</span>
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="25"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                    </svg>
                  </span>
                </div>
              </Link>

              <div className="flex flex-col basket-features items-center">
                <div className="basket-feature gap-4">
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM12 3.04879L5 4.60434V13.7889C5 15.1263 5.6684 16.3752 6.7812 17.1171L12 20.5963L17.2188 17.1171C18.3316 16.3752 19 15.1263 19 13.7889V4.60434L12 3.04879ZM16.4524 8.22183L17.8666 9.63604L11.5026 16L7.25999 11.7574L8.67421 10.3431L11.5019 13.1709L16.4524 8.22183Z"></path>
                    </svg>
                  </span>
                  <span>Kredi kartına 12 aya kadar taksit</span>
                </div>
                <div className=" basket-feature gap-4">
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </span>
                  <span>14 gün içinde iade ve değişim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
