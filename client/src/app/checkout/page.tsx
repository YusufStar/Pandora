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
import LabelInput from "@/components/LabelInput";

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
        cardNumber: string;
        cardName: string;
        date: string;
        cvc: string;
    }>
    ({
        email: "",
        name: "",
        surname: "",
        adress: "",
        detail: "",
        city: "",
        state: "",
        tel: "",
        cardNumber: "",
        cardName: "",
        date: "",
        cvc: "",
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
                        className={"mb-10 sm:mb-20"}
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="flex gap-4 w-fit">
                                <span
                                    className={"w-8 h-8 rounded-full flex items-center justify-center font-medium bg-black text-white"}>
                            {step === 2 ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="10.3" height="8" viewBox="8.9 0.3 10.3 8"
                                     enable-background="new 8.9 0.3 10.3 8">
                                    <path fill="currentColor" d="M12.6 8.1l-3.7-3.8 1-1.1 2.7 2.7 5.5-5.4 1 1z"></path>
                                </svg> : 1}
                        </span>

                            <span className={"text-xl font-medium"}>
                                Adres
                            </span>
                        </div>

                        <div className="flex flex-row sm:flex-col gap-1">
                            {step === 2 && (
                                <div className={"flex flex-col w-full h-fit"}>
                                    <span className={"text-sm font-medium mb-2"}>{inputs.email}</span>
                                    <span
                                        className={"text-sm text-[#24262a] font-medium"}>{inputs.name} {inputs.surname}</span>
                                    <span className={"text-xs text-[#24262a] font-medium"}>{inputs.tel}</span>
                                    <span
                                        className={"text-xs text-[#24262a] font-medium break-words overflow-hidden w-full"}>{inputs.adress}, {inputs.detail}, {inputs.state}, {inputs.city}</span>
                                </div>
                            )}

                            {step === 2 &&
                                <div className="justify-start sm:hidden flex">
                                    {step === 2 && <button className={"hover-interstellar h-fit font-medium"}
                                                           onClick={() => setStep(1)}>Edit</button>}
                                </div>
                            }
                        </div>

                        <div className="justify-end hidden sm:flex">
                            {step === 2 && <button className={"hover-interstellar h-fit font-medium"}
                                                   onClick={() => setStep(1)}>Edit</button>}
                        </div>
                    </div>

                    {step === 1 && (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                console.log(inputs)
                                setStep(2)
                            }}
                            className="flex w-full flex-col m-0 mt-6 sm:m-12 items-center gap-2">
                            <div className="w-full flex flex-col mb-6 gap-4">
                                <Label className={"text-nowrap text-left w-full text-lg font-normal"} htmlFor="email">
                                    İletişim Adresleri
                                </Label>

                                <LabelInput
                                    value={inputs.email}
                                    title={'Email'}
                                    label={'email'}
                                    setValue={setInputs}
                                />
                            </div>

                            <Label className={"text-nowrap text-left w-full text-lg font-normal"} htmlFor="email">
                                Teslimat Adresi
                            </Label>

                            <div className="flex w-full gap-4 items-center">
                                <LabelInput
                                    value={inputs.name}
                                    title={'Ad'}
                                    label={'name'}
                                    setValue={setInputs}
                                />
                                <LabelInput
                                    value={inputs.surname}
                                    title={'Soyad'}
                                    label={'surname'}
                                    setValue={setInputs}
                                />
                            </div>

                            <LabelInput
                                value={inputs.adress}
                                title={'Adres'}
                                label={'adress'}
                                setValue={setInputs}
                            />

                            <LabelInput
                                value={inputs.detail}
                                title={"Apartman, daire, vb."}
                                label={'detail'}
                                setValue={setInputs}
                            />

                            <div className="flex w-full gap-2 items-center">
                                <Select value={inputs.city}
                                        onValueChange={(value) => {
                                            setInputs((prev) => ({...prev, city: value}))
                                            setInputs((prev) => ({...prev, state: ""}))
                                        }}>
                                    <SelectTrigger id={'il'}
                                                   className="border w-full px-4 !py-3 h-fit gap-2 rounded-md relative ring-0 !text-sm">
                                        <SelectValue className={"capitalize !text-sm"} placeholder="İl seçiniz."/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>İller</SelectLabel>
                                            {turkey.map((item, index) => <SelectItem className={"capitalize"}
                                                                                     value={item.il_adi}>{item.il_adi}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select value={inputs.state}
                                        onValueChange={(value) => setInputs((prev) => ({...prev, state: value}))}>
                                    <SelectTrigger id={'ilce'}
                                                   className="border w-full px-4 !py-3 h-fit gap-2 rounded-md relative ring-0 !text-sm">
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

                            <LabelInput
                                value={inputs.tel}
                                title={"Telefon Numarası"}
                                label={'tel'}
                                formater={'tel'}
                                setValue={setInputs}
                            />

                            <button
                                type={'submit'}
                                className={"w-full mt-8 !h-[56px] rounded hover:bg-black transition-all duration-200 ease-in-out text-white font-medium bg-[#272727]"}>
                                Kargo ile Devam Et
                            </button>
                        </form>
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
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                console.log(inputs)
                                setStep(2)
                            }}
                            className="flex w-full flex-col m-0 mt-6 sm:m-12 items-center gap-2">
                            <div
                                className="w-full h-fit bg-[#F7F7F9] border-black border-2 rounded-[8px] p-[16px] flex flex-col gap-3">

                                <LabelInput
                                    value={inputs.cardNumber}
                                    title={"Kart numarası"}
                                    label={'cardNumber'}
                                    formater={'cardNumber'}
                                    setValue={setInputs}
                                />

                                <LabelInput
                                    value={inputs.cardName}
                                    title={"Kart üzerindeki isim"}
                                    label={'cardName'}
                                    setValue={setInputs}
                                />

                                <div className="flex flex-col sm:flex-row bg-[#F7F7F9] w-full gap-2 items-center">
                                    <LabelInput
                                        value={inputs.date}
                                        title={"Ay / Yil"}
                                        label={'date'}
                                        formater={'cardExpirationDate'}
                                        setValue={setInputs}
                                    />

                                    <LabelInput
                                        value={inputs.cvc}
                                        title={"CVC"}
                                        label={'cvc'}
                                        formater={'cvc'}
                                        setValue={setInputs}
                                    />
                                </div>

                                <div className="mt-[16px]">
                                    <div className="text-base mb-[16px]">Taksit Seçenekleri</div>
                                    <div
                                        className="rounded-[8px] cursor-pointer hover:opacity-90 transition-all duration-200 bg-white border">
                                        <div className="h-[56px] flex px-4 items-center">
                                            <div
                                                className="w-auto p-0 flex">
                                                <div className="mr-2 w-[20px] h-[20px] relative">
                                                    <div
                                                        className="w-[20px] h-[20px] rounded-full absolute bg-[#272727]"></div>
                                                    <div
                                                        className="w-[16px] h-[16px] absolute left-0.5 top-0.5 flex items-center justify-center top-0 left-0">
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

                                            <span className="text-sm font-medium ml-2">Tek Çekim</span>

                                            <div className="ml-auto text-sm font-medium">₺ 8,460.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 mt-8 w-full">
                                <div className="flex items-center gap-4">
                                    <Checkbox id={"check-01"} className={"w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"}/>

                                    <Label htmlFor={"check-01"}
                                           className={"text-[#8A8B94] text-xs sm:text-sm font-normal"}>Fatura
                                        adresim teslimat adresimle aynı</Label>
                                </div>
                                <div className="flex items-start sm:items-center gap-4">
                                    <Checkbox id={"check-02"} className={"w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"}/>

                                    <Label htmlFor={"check-02"}
                                           className="flex flex-wrap items-center gap-1 text-[#8A8B94] text-xs sm:text-sm font-normal">
                                        <span
                                            className="text-black font-medium text-xs sm:text-sm text-nowrap">Gizlilik Sözleşmesini</span>
                                        ve
                                        <span
                                            className="text-black font-medium text-xs sm:text-sm text-nowrap">Satış Sözleşmesini</span>
                                        okudum, onaylıyorum.
                                    </Label>
                                </div>
                            </div>

                            <button
                                type={'submit'}
                                className={"w-full mt-8 !h-[56px] rounded hover:bg-black transition-all duration-200 ease-in-out text-white font-medium bg-[#272727]"}>
                                Siparişi Tamamla
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <div className="w-full hidden sm:flex min-h-screen h-fit flex-col p-4 bg-[#F7F7F9]">
                <div className="max-w-[600px] w-full mx-auto">
                    <div className="w-full h-full flex flex-col">
                        <div className="flex flex-col border-b w-full py-4">
                            {products.map(({product, size, quantity, id}, index) => {
                                return (
                                    <div key={id} className={"w-full py-1 relative h-fit"}>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-fit relative">
                                                <img src={product.banner.url} alt=""/>
                                            </div>

                                            <div className="flex flex-col justify-between w-full">
                                                <div className="flex flex-col justify-between h-full pl-6 w-full">
                                                    <div>
                                                        <Link
                                                            className="hover:underline text-xs font-normal"
                                                            href={`/product/${product.id}`}>{product.description}</Link>

                                                        <div className="[&_span]:text-[11px]">
                                                <span
                                                    className="variant-type">Fiyat: </span>

                                                            <span
                                                                className="variant-name">{formatCurrency(Number(cmToSquareMeter(size.dimensions).toFixed(2)) * product.price)}</span>
                                                        </div>

                                                        <div className="[&_span]:text-[11px]">
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
                                                    className={"text-[#9da5af] text-[11px]"}>Adet:</span>
                                                        <span style={{color: "rgb(8, 8, 8)"}}
                                                              className={"ml-1 text-[12px]"}>{quantity}</span>
                                                    </div>

                                                    <div className="flex flex-col">
                                                        {!product.discount || product.discount !== 0 &&
                                                            <span
                                                                className={"text-[#8a8b94] text-[11px] line-through"}>{formatCurrency(cmToSquareMeter(size.dimensions) * product.price * quantity)}</span>}

                                                        <span
                                                            className={"text-[13px] font-medium text-black"}>
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