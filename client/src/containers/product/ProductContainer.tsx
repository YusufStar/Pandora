import React from "react";

type Props = {
  product_id: any;
};

const ProductContainer = ({ product_id }: Props) => {
  return <div>ProductContainer {product_id}</div>;
};

export default ProductContainer;
