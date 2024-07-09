import React from 'react'

type Props = {
    status: string;
}

const OrderStatus = ({ status }: Props) => {
  return (
    <div className={`w-20 border rounded h-8 flex items-center shadow-md justify-center ${
        status === "WAIT" ? "bg-orange-400 text-white text-sm font-medium" : ""
    }`}>{status}</div>
  )
}

export default OrderStatus