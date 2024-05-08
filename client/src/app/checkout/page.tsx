"use client"

import useBasket, {calculateTotalPrice, cmToSquareMeter, formatCurrency, useDiscount} from "@/zustand/useBasket";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {turkey} from "@/lib/turkey";

const CheckoutPage = () => {
    const {data} = useSession()

    const [step, setStep] = useState(1);
    const [inputs, setInputs] = useState<{
        email: string;
        name: string;
        surname: string;
        adress: string;
        detail: string;
        city: string;
        state: string;
        tel: string;
    }>({
        email: "",
        name: "",
        surname: "",
        adress: "",
        detail: "",
        city: "",
        state: "",
        tel: "",
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
            // @ts-ignore
            setInputs((prev) => ({
                email: data?.user?.email as string
            }))
        }
    }, [data])

    return <div className={"h-screen w-full flex items-center justify-center"}>
        <div className="w-full mx-auto h-full flex">
            <div className="w-full h-full flex flex-col p-4 px-8">
                <div className="max-w-[600px] w-full mx-auto">
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

                    <div className="flex gap-6 items-center">
                            <span
                                className={"w-8 h-8 rounded-full flex items-center justify-center font-medium bg-black text-white"}>
                            1
                        </span>

                        <span className={"text-xl font-medium"}>
                                Adres
                            </span>
                    </div>

                    {step === 1 && (
                        <div className="flex w-full flex-col m-12 items-center gap-2">
                            <div className="w-full flex flex-col gap-2 mb-8">
                                <Label className={"text-nowrap text-left w-full text-lg font-normal"} htmlFor="email">
                                    Email
                                </Label>
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"email"}
                                           className={"text-xs w-full font-normal text-[#8A8B94]"}>E-posta</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                        id={"email"}
                                        className={"w-full outline-0 text-sm font-medium"}
                                        placeholder={"Email"}
                                    />
                                </div>
                            </div>

                            <Label className={"text-nowrap text-left w-full text-lg font-normal"} htmlFor="email">
                                Teslimat Adresi
                            </Label>

                            <div className="flex w-full gap-2 items-center">
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"name"}
                                           className={"text-xs w-full font-normal text-[#8A8B94]"}>Ad</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, name: e.target.value}))}
                                        id={"name"}
                                        className={"w-full outline-0 text-sm font-medium"}
                                        placeholder={"Ad"}
                                    />
                                </div>

                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"surname"}
                                           className={"text-xs w-full font-normal text-[#8A8B94]"}>Soyad</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, surname: e.target.value}))}
                                        id={"surname"}
                                        className={"w-full outline-0 text-sm font-medium"}
                                        placeholder={"Soyad"}
                                    />
                                </div>
                            </div>
                            <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                <Label htmlFor={"adress"}
                                       className={"text-xs w-full font-normal text-[#8A8B94]"}>Adres</Label>
                                <input
                                    required
                                    onChange={(e) => setInputs((prev) => ({...prev, adress: e.target.value}))}
                                    id={"adress"}
                                    className={"w-full outline-0 text-sm font-medium"}
                                    placeholder={"Adres"}
                                />
                            </div>
                            <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                <Label htmlFor={"detail"}
                                       className={"text-xs w-full font-normal text-[#8A8B94]"}>Apartman, daire,
                                    vb.</Label>
                                <input
                                    required
                                    onChange={(e) => setInputs((prev) => ({...prev, detail: e.target.value}))}
                                    id={"detail"}
                                    className={"w-full outline-0 text-sm font-medium"}
                                    placeholder={"Apartman, daire, vb."}
                                />
                            </div>
                            <div className="flex w-full gap-2 items-center">
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"il"}
                                           className={"text-xs w-full font-normal text-[#8A8B94]"}>İl</Label>
                                    <Select onValueChange={(value) => setInputs((prev) => ({...prev, city: value}))}>
                                        <SelectTrigger id={'il'} className="border-none w-full h-min p-0 py-1 ring-0">
                                            <SelectValue className={"capitalize"} placeholder="İl seçiniz."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>İller</SelectLabel>
                                                {turkey.map((item, index) => <SelectItem className={"capitalize"}
                                                                                         value={item.il_adi}>{item.il_adi}</SelectItem>)}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                    <Label htmlFor={"ce"}
                                           className={"text-xs w-full font-normal text-[#8A8B94]"}>İlçe</Label>
                                    <Select onValueChange={(value) => setInputs((prev) => ({...prev, state: value}))}>
                                        <SelectTrigger id={'ilce'} className="border-none w-full h-min p-0 py-1 ring-0">
                                            <SelectValue className={"capitalize"} placeholder="İlçe seçiniz."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>İlçeler</SelectLabel>
                                                {turkey?.filter((item) => inputs.city === "" || item.il_adi === inputs.city)?.map((item, index) => {
                                                        if (item?.ilceler) {
                                                            return <>
                                                                {item.ilceler.map((state, index) => <SelectItem
                                                                    className={"capitalize"}
                                                                    value={state.ilce_adi}>{state.ilce_adi.toLowerCase()}</SelectItem>)}
                                                            </>
                                                        }
                                                        return <></>
                                                    }
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                <Label htmlFor={"phone"}
                                       className={"text-xs w-full font-normal text-[#8A8B94]"}>Telefon</Label>
                                <input
                                    required
                                    onChange={(e) => setInputs((prev) => ({...prev, phone: e.target.value}))}
                                    id={"phone"}
                                    className={"w-full outline-0 text-sm font-medium"}
                                    placeholder={"Telefon"}
                                />
                            </div>

                            <button onClick={() => setStep(2)}
                                    className={"w-full mt-8 !h-[56px] rounded hover:bg-black transition-all duration-200 ease-in-out text-white font-medium bg-[#272727]"}>
                                Kargo ile Devam Et
                            </button>
                        </div>
                    )}

                    <div className="flex gap-6 items-center my-10">
                            <span
                                className={"w-8 h-8 rounded-full flex items-center justify-center font-medium bg-black text-white"}>
                            2
                        </span>

                        <span className={"text-xl font-medium"}>
                                Ödeme
                            </span>
                    </div>

                    {step === 2 && (
                        <div className="flex w-full flex-col m-12 items-center gap-2">
                            <div
                                className="w-full h-fit bg-[#F7F7F9] border-black border-2 rounded-[8px] p-[16px] flex flex-col gap-3">
                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative bg-white">
                                    <Label htmlFor={"email"}
                                           className={"text-xs font-medium w-full text-[#8A8B94]"}>E-posta</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                        id={"email"}
                                        className={"w-full outline-0 text-sm font-normal"}
                                        placeholder={"Email"}
                                    />
                                </div>

                                <div className="border w-full px-4 py-2 gap-2 rounded-md relative bg-white">
                                    <Label htmlFor={"email"}
                                           className={"text-xs font-medium w-full text-[#8A8B94]"}>E-posta</Label>
                                    <input
                                        required
                                        onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                        id={"email"}
                                        className={"w-full outline-0 text-sm font-normal"}
                                        placeholder={"Email"}
                                    />
                                </div>

                                <div className="flex w-full gap-2 items-center bg-white">
                                    <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                        <Label htmlFor={"email"}
                                               className={"text-xs font-medium w-full text-[#8A8B94]"}>E-posta</Label>
                                        <input
                                            required
                                            onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                            id={"email"}
                                            className={"w-full outline-0 text-sm font-normal"}
                                            placeholder={"Email"}
                                        />
                                    </div>
                                    <div className="border w-full px-4 py-2 gap-2 rounded-md relative">
                                        <Label htmlFor={"email"}
                                               className={"text-xs font-medium w-full text-[#8A8B94]"}>E-posta</Label>
                                        <input
                                            required
                                            onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
                                            id={"email"}
                                            className={"w-full outline-0 text-sm font-normal"}
                                            placeholder={"Email"}
                                        />
                                    </div>
                                </div>

                                <div className="mt-[32px]">
                                    <div className="text-base mb-[16ox]">Taksit Seçenekleri</div>
                                    <div className="rounded-[8px] bg-white border">
                                        <div className="h-[56px] flex px-4 items-center">
                                            <div
                                                className="w-auto p-0 flex">
                                                <div className="mr-4 w-[20px] h-[20px] relative">
                                                    <div
                                                        className="w-[24px] h-[24px] rounded-full absolute bg-[#272727]"></div>
                                                    <div
                                                        className="w-[24px] h-[24px] absolute flex items-center justify-center top-0 left-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10.3" height="8"
                                                             viewBox="8.9 0.3 10.3 8"
                                                             color={"white"}
                                                             enableBackground="new 8.9 0.3 10.3 8">
                                                            <path fill="currentColor"
                                                                  d="M12.6 8.1l-3.7-3.8 1-1.1 2.7 2.7 5.5-5.4 1 1z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="style-module_CheckboxLabelContainer__1g1JQ"></div>
                                            </div>

                                            <span className="text-sm ml-[6px]">Tek Çekim</span>

                                            <div className="ml-auto text-sm font-medium">₺ 8,460.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-8 w-full">
                                <div className="flex items-center gap-4">
                                    <Checkbox id={"check-01"} className={"w-[20px] h-[20px]"}/>

                                    <Label htmlFor={"check-01"} className={"text-[#8A8B94] text-sm font-normal"}>Fatura
                                        adresim teslimat adresimle aynı</Label>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Checkbox id={"check-02"} className={"w-[20px] h-[20px]"}/>

                                    <Label htmlFor={"check-02"}
                                           className="flex items-center gap-1 text-[#8A8B94] text-sm font-normal">
                                        <span
                                            className="text-black font-medium text-sm">Gizlilik Sözleşmesini</span>
                                        ve
                                        <span
                                            className="text-black font-medium text-sm">Satış Sözleşmesini</span>
                                        okudum, onaylıyorum.
                                    </Label>
                                </div>
                            </div>

                            <button
                                className={"w-full mt-8 !h-[56px] rounded hover:bg-black transition-all duration-200 ease-in-out text-white font-medium bg-[#272727]"}>
                                Siparişi Tamamla
                            </button>
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

                                                        <span
                                                            className={"text-[13px] sm:text-[14px] font-medium text-black"}>
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