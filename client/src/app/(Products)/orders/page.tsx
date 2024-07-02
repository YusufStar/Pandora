"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[] | null>(null);

  const getMyOrders = async () => {
    const {
      data: { data },
      status,
    } = await axios.get("/api/order");
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
    <div className="flex flex-col gap-4">
      <span className="font-extrabold text-2xl">
        Loading: {JSON.stringify(loading)}
      </span>
      <span className="font-medium text-sm">{JSON.stringify(orders)}</span>
    </div>
  );
};

export default OrdersPage;
