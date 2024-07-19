"use client";
import OrderStatus from "@/components/OrderStatus";
import {
  formatCurrency,
} from "@/zustand/useBasket";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);

  const getMyOrders = async () => {
    const {
      data: { data },
      status,
    } = await axios.get("/api/order/admin");
    if (status === 200) {
      setOrders(data);
      console.log(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="container mx-auto mt-8 mb-4 pb-8">
        <span className="text-2xl font-bold">Siparişlerim</span>

        <div className="gap-4 px-4 flex flex-col mt-6">
          {orders?.map((order: any) => {
            const buyer = order.buyer;
            return (
              <div className="w-full h-fit rounded border-2 gap-4 shadow-md p-4 flex flex-col">
                <div className="flex h-fit items-center w-full justify-between">
                  <span className="text-sm font-semibold underline">
                    Sipariş No: {order.id}
                  </span>

                  <span className="text-xs font-semibold underline">
                    {order.createdAt && `Sipariş Tarihi: ${order.createdAt}`}
                  </span>
                </div>

                <div className="flex flex-col w-full h-fit">
                  <div className="[&_span]:text-[13px] sm:[&_span]:text-[14px]">
                    <span className="variant-type">İsim: </span>

                    <span className="variant-name">
                      {buyer.name} {buyer.surname}
                    </span>
                  </div>
                  
                  <div className="[&_span]:text-[13px] sm:[&_span]:text-[14px]">
                    <span className="variant-type">Şehir / İlçe: </span>

                    <span className="variant-name">
                      {buyer.city} / {buyer.state}
                    </span>
                  </div>
                  
                  <div className="[&_span]:text-[13px] sm:[&_span]:text-[14px]">
                    <span className="variant-type">Tel: </span>

                    <span className="variant-name">
                      {buyer.gsmNumber.replaceAll(" ", "")}
                    </span>
                  </div>
                  
                  <div className="[&_span]:text-[13px] sm:[&_span]:text-[14px]">
                    <span className="variant-type">Adres: </span>

                    <span className="variant-name">
                      {buyer.adress}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full h-fit">
                  {order.basketItems?.map(
                    ({
                      name,
                      size,
                      price,
                      product,
                      quantity,
                      category1,
                      category2,
                    }: any) => {
                      return (
                        <div className="flex gap-4 border-2 p-4 rounded-md relative">
                          <div className="absolute w-fit h-fit right-4 top-4">
                            <OrderStatus status={order?.status as string} />
                          </div>

                          <div className="absolute w-fit h-fit right-4 bottom-4">
                            <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                              <span className="variant-type">
                                Toplam Fiyat:{" "}
                              </span>

                              <span className="variant-name">
                                {formatCurrency(price)}
                              </span>
                            </div>
                          </div>

                          <img
                            src={product.banner.url}
                            alt=""
                            className="h-32 object-contain"
                          />

                          <div className="flex flex-col justify-between w-full">
                            <div className="flex flex-col justify-between h-full pl-6 w-full">
                              <div>
                                <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                  <span className="variant-type">Marka: </span>

                                  <span className="variant-name">
                                    {category1}
                                  </span>
                                </div>

                                <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                  <span className="variant-type">Seri: </span>

                                  <span className="variant-name">
                                    {category2}
                                  </span>
                                </div>

                                <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                  <span className="variant-type">
                                    Ürün Kodu:{" "}
                                  </span>

                                  <span className="variant-name">{name}</span>
                                </div>

                                <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                  <span className="variant-type">Fiyat: </span>

                                  <span className="variant-name">
                                    {
                                      // @ts-ignore
                                      formatCurrency(Number(price) / quantity)
                                    }
                                  </span>
                                </div>

                                <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                  <span className="variant-type">Adet: </span>

                                  <span className="variant-name">
                                    {quantity}
                                  </span>
                                </div>

                                <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                  <span className="variant-type">Ebat: </span>

                                  <span className="variant-name">
                                    {size.dimensions}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;