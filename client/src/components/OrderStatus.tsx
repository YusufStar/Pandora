import React from "react";

type Props = {
  status: string;
};

const OrderStatus = ({ status }: Props) => {
  return (
    <div
      className={`w-fit px-2.5 border rounded h-8 flex items-center shadow-md justify-center ${
        status === "WAIT"
          ? "bg-orange-400 text-white text-sm font-medium"
          : status === "GETTING_READY"
          ? "bg-yellow-500 text-white text-sm font-medium"
          : ""
      }`}
    >
      {status === "WAIT" && "Siparisiniz kargoya verilmek uzere hazirlaniyor."}
      {status === "GETTING_READY" && "Siparisiniz Kargoda."}
    </div>
  );
};

export default OrderStatus;
