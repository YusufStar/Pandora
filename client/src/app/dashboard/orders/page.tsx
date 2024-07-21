"use client";
import OrderStatus from "@/components/OrderStatus";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/zustand/useBasket";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrdersPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [inputs, setInputs] = useState<{
    kargo: string;
    takipno: string;
  }>({
    kargo: "",
    takipno: "",
  });

  const getAllOrders = async () => {
    setLoading;
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

  const updateOrderById = async (id: number) => {
    setLoading(true);
    const {
      data: { data },
      status,
    } = await axios.put("/api/order/admin", { ...inputs, id });
    if (status === 200) {
      getAllOrders();
    }

    setLoading(false);
  };

  const cancelOrder = async (id: number) => {
    setLoading(true);
    const {
      data: { data },
      status,
    } = await axios.put("/api/order/admin", { cancel: true, id: id });
    if (status === 200) {
      getAllOrders();
    }

    setLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="container mx-auto mt-8 mb-4 pb-8">
        <span className="text-2xl font-bold">Siparişlerim</span>
        <div className="gap-4 px-4 flex flex-col mt-6">
          {orders?.map((order: any) => {
            const buyer = order.buyer;
            const orderId = order.id;
            return (
              <div
                key={orderId}
                className="w-full h-fit rounded border-2 gap-4 shadow-md p-4 flex flex-col"
              >
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

                    <span className="variant-name">{buyer.adress}</span>
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
                        <div
                          className={`flex gap-4 border-2 p-4 rounded-md relative`}
                        >
                          {order?.status === "RETURN" && (
                            <div className="absolute w-full h-full cursor-not-allowed text-2xl z-10 text-white font-extrabold flex left-0 top-0 rounded-md items-center justify-center bg-opacity-75 bg-red-500">
                              IPTAL
                            </div>
                          )}
                          <div className="absolute w-fit h-fit flex gap-4 right-4 top-4">
                            {order?.status !== "RETURN" && (
                              <OrderStatus status={order?.status as string} />
                            )}
                            {order?.status === "GETTING_READY" && (
                              <div className="w-fit px-2.5 border rounded h-8 flex items-center shadow-md justify-center bg-slate-900 text-white text-sm font-medium">
                                {order.kargo}
                              </div>
                            )}
                            {order?.status === "GETTING_READY" && (
                              <div className="w-fit px-2.5 border rounded h-8 flex items-center shadow-md justify-center bg-slate-900 text-white text-sm font-medium">
                                Takip No: {order?.takipNo}
                              </div>
                            )}
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

                <div className="w-full flex gap-2">
                  <Dialog>
                    <DialogTrigger
                      disabled={order?.status === "RETURN"}
                      className="flex flex-1"
                    >
                      <Button
                        disabled={order?.status === "RETURN"}
                        className="flex flex-1"
                      >
                        Update
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Order</DialogTitle>
                        <DialogDescription>Upda order.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="takipNo"
                            className="text-nowrap text-right"
                          >
                            Takip No
                          </Label>
                          <Input
                            id="takipNo"
                            placeholder={"Takip No"}
                            className="col-span-3"
                            value={inputs.takipno}
                            onChange={(value) =>
                              setInputs((prev) => ({
                                ...prev,
                                takipno: value.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="kargo"
                            className="text-nowrap text-right"
                          >
                            Kargo Firma
                          </Label>
                          <Select
                            value={inputs.kargo}
                            onValueChange={(value) =>
                              setInputs((prev) => ({ ...prev, kargo: value }))
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Tüm ölçüler" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={"yurtici"}>Yurtici</SelectItem>
                              <SelectItem value={"aras"}>Aras</SelectItem>
                              <SelectItem value={"suraat"}>Sürat</SelectItem>
                              <SelectItem value={"mng"}>Mng</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter className={"flex items-center gap-2"}>
                        <DialogClose>
                          <Button variant={"destructive"}>Iptal</Button>
                        </DialogClose>

                        <DialogClose>
                          <Button
                            onClick={async () => await updateOrderById(orderId)}
                            type="submit"
                          >
                            Kaydet
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    disabled={order?.status === "RETURN"}
                    onClick={async () => await cancelOrder(orderId)}
                    variant={"destructive"}
                    className="flex flex-1"
                  >
                    ! Cancel Order !
                  </Button>
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
