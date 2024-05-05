"use client"

import useBasket, {calculateTotalPrice, cmToSquareMeter, formatCurrency, useDiscount} from "@/zustand/useBasket";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const CheckoutPage = () => {
    const {data} = useSession()

    const [step, setStep] = useState(1);
    const [inputs, setInputs] = useState<{
        email: string;
    }>({
        email: ""
    })

    const {setBasket, products} = useBasket()
    const totalPrice = calculateTotalPrice(products)

    const getData = async () => {
        await fetch(`/api/basket`, {
            mode: "no-cors",
        }).then((x) => x.json()).then(({data}) => {
            setBasket(data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (data?.user) {
            setInputs((prev) => ({
                email: data?.user?.email as string
            }))
        }
    }, [data])

    return <div className={"h-screen w-full flex items-center justify-center"}>
        <div className="w-full mx-auto h-full flex">
            <div className="w-full h-full flex flex-col p-4 px-8">
                <div className="max-w-[600px] mx-auto">
                    <Image
                        src="/images/logo.png"
                        width={150}
                        height={30.47}
                        quality={100}
                        alt="logo"
                        decoding="async"
                        draggable="false"
                        className={"mb-20"}
                    />

                    {step === 1 && (
                        <div className={"flex flex-col"}>
                            <div className="flex gap-6 items-center mb-10">
                            <span
                                className={"w-8 h-8 rounded-full flex items-center justify-center font-medium bg-black text-white"}>
                            1
                        </span>

                                <span className={"text-xl font-medium"}>
                                Adres
                            </span>
                            </div>

                            <div className="flex flex-col pl-8 items-center gap-2">
                                <Label className={"text-nowrap text-left w-full text-lg font-normal"} htmlFor="email">
                                    İletişim Bilgileri
                                </Label>

                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                    <input
                                        required
                                        value={inputs.email}
                                        onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                        id={"email"}
                                        className={"w-full outline-0 text-sm font-medium"}
                                        type={"email"}
                                        placeholder={"Email"}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col pl-8 mt-12 items-center gap-2">
                                <Label className={"text-nowrap text-left w-full text-lg font-normal"} htmlFor="email">
                                    Teslimat Adresi
                                </Label>

                                <div className="flex w-full gap-2 items-center">
                                    <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                        <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                        <input
                                            required
                                            onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                            id={"email"}
                                            className={"w-full outline-0 text-sm font-medium"}
                                            placeholder={"Email"}
                                        />
                                    </div>
                                    <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                        <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                        <input
                                            required
                                            onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                            id={"email"}
                                            className={"w-full outline-0 text-sm font-medium"}
                                            placeholder={"Email"}
                                        />
                                    </div>
                                </div>
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                        id={"email"}
                                        className={"w-full outline-0 text-sm font-medium"}
                                        placeholder={"Email"}
                                    />
                                </div>
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                        id={"email"}
                                        className={"w-full outline-0 text-sm font-medium"}
                                        placeholder={"Email"}
                                    />
                                </div>
                                <div className="flex w-full gap-2 items-center">
                                    <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                        <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                        <input
                                            required
                                            onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                            id={"email"}
                                            className={"w-full outline-0 text-sm font-medium"}
                                            placeholder={"Email"}
                                        />
                                    </div>
                                    <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                        <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                        <input
                                            required
                                            onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                            id={"email"}
                                            className={"w-full outline-0 text-sm font-medium"}
                                            placeholder={"Email"}
                                        />
                                    </div>
                                </div>
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"email"} className={"text-xs w-full text-[#8A8B94]"}>E-posta</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                        id={"email"}
                                        className={"w-full outline-0 text-sm font-medium"}
                                        placeholder={"Email"}
                                    />
                                </div>

                                <button onClick={() => setStep(2)} className={"w-full mt-8 !h-[56px] rounded hover:bg-black transition-all duration-200 ease-in-out text-white font-medium bg-[#272727]"}>
                                    Kargo ile Devam Et
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-full flex flex-col p-4 bg-[#F7F7F9]">
                <div className="max-w-[600px] w-full mx-auto">
                    <div className="w-full h-full flex flex-col">
                        <div className="flex flex-col border-b w-full py-4">
                            {products.map(({product, size, quantity, id}, index) => {
                                return (
                                    <div key={id} className={"w-full py-4 relative h-fit"}>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-20 h-fit relative">
                                                <img src={product.banner.url} alt=""/>
                                            </div>

                                            <div className="flex flex-col justify-between w-full">
                                                <div className="flex flex-col justify-between h-full pl-6 w-full">
                                                    <div>
                                                        <Link
                                                            className="hover:underline text-xs sm:text-sm font-normal"
                                                            href={`/product/${product.id}`}>{product.description}</Link>

                                                        <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                                <span
                                                    className="variant-type">Fiyat: </span>

                                                            <span
                                                                className="variant-name">{formatCurrency(Number(cmToSquareMeter(size.dimensions).toFixed(2)) * product.price)}</span>
                                                        </div>

                                                        <div className="[&_span]:text-[12px] sm:[&_span]:text-[13px]">
                                                <span
                                                    className="variant-type"> ebat: </span>
                                                            <span className="variant-name">{size.dimensions}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="basket-quantity-main flex flex-row justify-between pl-6 items-center">
                                                    <div className="flex items-center">
                                                <span
                                                    className={"text-[#9da5af] text-[13px] sm:text-[14px]"}>Adet:</span>
                                                        <span style={{color: "rgb(8, 8, 8)"}}
                                                              className={"ml-1 text-[14px]"}>{quantity}</span>
                                                    </div>

                                                    <div className="flex flex-col">
                                                        {!product.discount || product.discount !== 0 &&
                                                            <span
                                                                className={"text-[#8a8b94] text-[13px] sm:text-[14px] line-through"}>{formatCurrency(cmToSquareMeter(size.dimensions) * product.price * quantity)}</span>}

                                                        <span className={"text-[13px] sm:text-[14px] font-medium text-black"}>
                    {formatCurrency(useDiscount(Number(cmToSquareMeter(size.dimensions).toFixed(2)) * product.price * quantity, product.discount) as number)}
                </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        
                        <div className="py-4 border-b flex flex-col gap-4">
                            <div className="w-full flex items-center justify-between">
                                <span className={"text-[#8A8B94] text-sm"}>Ara Toplam</span>

                                <span className={"text-sm"}>{totalPrice}</span>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <span className={"text-[#8A8B94] text-sm"}>Teslimat / Kargo</span>

                                <span className={"text-sm"}>Ücretsiz</span>
                            </div>
                        </div>

                        <div className={"py-4 flex items-center justify-between"}>
                            <span className={"text-lg font-medium"}>Toplam</span>

                            <span className={"font-medium text-xl"}>{totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CheckoutPage