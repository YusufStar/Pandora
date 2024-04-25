"use client"
import ProductContainer from "@/containers/product/ProductContainer";
import { useParams } from "next/navigation";
import React from "react";

const ProductPage = () => {
  const {id} = useParams()

  return <ProductContainer product_id={id} />;
};

export default ProductPage;
