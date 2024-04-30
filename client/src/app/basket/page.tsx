"use client"

import React, {useEffect} from "react";
import useBasket, {cmToSquareMeter, formatCurrency, useDiscount} from "@/zustand/useBasket";

const BasketPage = () => {
    const {setBasket, products } = useBasket()

    const getData = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/basket`).then((x) => x.json()).then(({data}) => {
            setBasket(data)
            console.log(data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return <div className={"flex flex-col gap-4 p-12"}>
        {products.map((product, index) => {
            return (
                <div key={index} className={"flex flex-col gap-2 p-2.5 rounded border w-full max-w-sm"}>
                    <span className={"text-sm font-medium"}>{product.product.description} - {product.size.dimensions}</span>

                    <div>
                        {product.product.discount > 0 && (
                            <div
                                className="flex items-center price-main"
                                style={{
                                    justifyContent: "unset",
                                    fontWeight: 500,
                                    marginTop: "10px",
                                    height: "40px",
                                }}
                            >
                                <div className="discount-price-main flex flex-row">
                                    <div
                                        className="discount-percent"
                                        style={{
                                            backgroundColor: "rgb(0, 0, 0)",
                                            color: "rgb(255, 255, 255)",
                                            fontWeight: 500,
                                            borderRadius: "0px",
                                        }}
                                    >
                                        %{product.product.discount}
                                    </div>
                                    <div className="flex discount-price flex-col">
                                        <span>{formatCurrency(cmToSquareMeter(product.size.dimensions) * product.product.price)}</span>
                                        <span style={{color: "rgb(8, 8, 8)"}}>
                                                {formatCurrency(useDiscount(Number(cmToSquareMeter(product.size.dimensions).toFixed(2)) * product.product.price, product.product.discount) as number)}
                                            </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {product.product.discount === 0 && (
                            <div
                                style={{
                                    justifyContent: "unset",
                                    fontWeight: 500,
                                }}
                            >
                                <div className="discount-price-main flex flex-row">
                                    <div className="flex flex-col">
                                            <span
                                                className="text-base lg:text-lg font-medium"
                                                style={{color: "rgb(8, 8, 8)"}}
                                            >
                                                {formatCurrency(useDiscount(Number(cmToSquareMeter(product.size.dimensions).toFixed(2)) * product.product.price, product.product.discount) as number)}
                                            </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <span className={"text-sm font-medium"}>{product.quantity} ADET</span>
                </div>
            )
        })}
    </div>
}

export default BasketPage