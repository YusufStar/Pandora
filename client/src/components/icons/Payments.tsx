import Image from "next/image";
import React from "react";

const Payments = () => {
  return (
    <div className="payment-icons">
      <Image
        alt="payments"
        height={50}
        width={300}
        quality={100}
        src={"/images/logo_band_colored.svg"}
      />
    </div>
  );
};

export default Payments;
