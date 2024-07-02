"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersAdminPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[] | null>(null);

  const getAllOrders = async () => {
    const {
      data: { data },
      status,
    } = await axios.get("/api/order/admin");
    if (status === 200) {
      setOrders(data);

      if (data) {
        let filtered: any[] = [];
        (data as any[]).forEach(
          ({
            userId,
            products,
            id,
            status,
          }: {
            userId: number;
            id: number;
            products: any[];
            status: string;
          }) => {
            if (filtered?.some((x) => x.UserId === userId)) {
              const x = filtered.map((ft) => {
                if (ft.UserId === userId) {
                  return {
                    ...ft,
                    OrderDatas: [
                      ...ft.OrderDatas,
                      {
                        OrderProducts: products,
                        OrderId: id,
                        OrderStatus: status,
                      },
                    ],
                  };
                }
              });

              filtered = x;
            } else {
              filtered.push({
                UserId: userId,
                OrderDatas: [
                  {
                    OrderProducts: products,
                    OrderId: id,
                    OrderStatus: status,
                  },
                ],
              });
            }
          }
        );

        console.log(filtered);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <span className="font-extrabold text-2xl">
        Loading: {JSON.stringify(loading)}
      </span>
      <span className="font-medium text-sm">{JSON.stringify(orders)}</span>
    </div>
  );
};

export default OrdersAdminPage;
