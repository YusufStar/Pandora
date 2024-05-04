"use client"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {toast} from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader2, MoreHorizontal, Plus, PlusCircle} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {createClient} from '@supabase/supabase-js'

const ProductDashboardPage = () => {
    const supabase = createClient('https://ipjfbfzysroitylwokvj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwamZiZnp5c3JvaXR5bHdva3ZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzgwMjMxNiwiZXhwIjoyMDI5Mzc4MzE2fQ.rsBA9PMr3zGMT5ZD1TiJDA2_gUwpY32JhEJFlwUKlNA')

    const bannerFileRef = useRef<null | HTMLInputElement>(null);
    const imagesRef = useRef([]);

    const [products, setProducts] = useState<null | any[]>(null);
    const [sizes, setSizes] = useState<null | any[]>([]);
    const [selectedSize, setSelectedSize] = useState<any>([])
    const [loading, setLoading] = useState({
        banner: false
    })

    const [addData, setAddData] = useState({
        brand: "",
        discount: 0,
        description: "",
        price: 0,
        banner: {
            url: "",
            file_name: "",
            file_extension: "",
        },
        images: [
            {
                url: "",
                file_name: "",
                file_extension: "",
            }
        ],
        defaultSizeId: 0,
        sizes: [null],
    })

    const getData = async () => {
        const response = await fetch(`/api/products`, {
            mode: "no-cors",
        }).then((x) => x.json());
        setProducts(response.data);
    };

    const getSizes = async () => {
        const response = await fetch(`/api/sizes`, {
            mode: "no-cors",
        }).then((x) => x.json());
        const y = response.data?.map((size: any) => {
            return {value: size.id, label: size.dimensions}
        })
        console.log(y)
        setSizes(y);
    }

    useEffect(() => {
        getData();
        getSizes()
    }, []);

    const resetData = () => {
        setAddData({
            brand: "",
            discount: 0,
            description: "",
            price: 0,
            banner: {
                url: "",
                file_name: "",
                file_extension: "",
            },
            images: [
                {
                    url: "",
                    file_name: "",
                    file_extension: "",
                }
            ],
            defaultSizeId: 0,
            sizes: [null],
        })
    }

    const handleAddProduct = async () => {
        const promise = fetch('/api/products', {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify({
                newData: addData
            })
        });

        toast.promise(promise, {
            loading: 'Loading...',
            success: () => {
                resetData()
                getData()
                return `Yeni ölçü eklendi.`;
            },
            error: () => {
                resetData()
                return 'Hatalı ölçü.'
            },
        });
    }

    const handleDeleteProduct = async (id: number) => {
        const promise = fetch('/api/sizes', {
            method: "DELETE",
            body: JSON.stringify({
                id: id
            })
        });

        toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => {
                resetData()
                getData()
                return `Ölçü silindi..`;
            },
            error: () => {
                resetData()
                return 'Hatalı ölçü.'
            },
        });
    }

    const handleChangeBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading((prev) => ({...prev, banner: true}))

        // @ts-ignore
        const file = e.target.files[0] as File

        // @ts-ignore
        const {data, error} = await supabase
            .storage
            .from('images')
            .upload(`public/${crypto.randomUUID()}`, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (data) {
            await fetch("/api/file", {
                method: "POST",
                body: JSON.stringify({
                    url: `https://ipjfbfzysroitylwokvj.supabase.co/storage/v1/object/public/${(data as any)?.fullPath}`,
                    file_name: file.name,
                    file_extension: file.type,
                })
            }).then((res) => res.json()).then((res) => changeData("banner", res.data))
        }

        setLoading((prev) => ({...prev, banner: false}))
    }

    const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // @ts-ignore
        const file = e.target.files[0] as File

        // @ts-ignore
        const {data, error} = await supabase
            .storage
            .from('images')
            .upload(`public/${crypto.randomUUID()}`, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (data) {
            await fetch("/api/file", {
                method: "POST",
                body: JSON.stringify({
                    url: `https://ipjfbfzysroitylwokvj.supabase.co/storage/v1/object/public/${(data as any)?.fullPath}`,
                    file_name: file.name,
                    file_extension: file.type,
                })
            }).then((res) => res.json()).then((res) => {
                setAddData((prev) => {
                    const updatedImages = [...prev.images];
                    updatedImages[index] = res.data;
                    return {...prev, images: updatedImages};
                });
            })
        }
    }

    const changeData = (key: string, value: any) => {
        setAddData((prev) => ({...prev, [key]: value}))
    }

    return (
        <div className={"p-4 w-full h-full flex items-center justify-center"}>
            <div className="mx-auto max-w-screen-xl h-fit w-full border rounded relative">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className={'w-8 h-8 rounded-full absolute -top-4 -right-4'}
                                size="icon">
                            <Plus size={18}/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Yeni Ölçü Gir</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className={"text-nowrap text-right"} htmlFor="brand">
                                    Marka
                                </Label>
                                <Input
                                    id="brand"
                                    placeholder={'Pandora Halı'}
                                    value={addData.brand}
                                    onChange={(e) => changeData("brand", e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className={"text-nowrap text-right"} htmlFor="discount">
                                    Indirim
                                </Label>
                                <Input
                                    id="discount"
                                    placeholder={'10'}
                                    min={0}
                                    max={100}
                                    type={"number"}
                                    value={addData.discount}
                                    onChange={(e) => changeData("discount", e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className={"text-nowrap text-right"} htmlFor="description">
                                    Açıklama
                                </Label>
                                <Input
                                    id="description"
                                    placeholder={'Açıklama'}
                                    min={0}
                                    max={100}
                                    value={addData.description}
                                    onChange={(e) => changeData("description", e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className={"text-nowrap text-right"} htmlFor="price">
                                    Fiyat
                                </Label>
                                <Input
                                    id="price"
                                    placeholder={'Fiyat'}
                                    min={0}
                                    max={100}
                                    type={"number"}
                                    value={addData.price}
                                    onChange={(e) => changeData("price", e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description"
                                       className="text-right text-nowrap">
                                    Kapak Görseli
                                </Label>

                                {addData.banner.url === "" ? (
                                    <>
                                        <input onChange={handleChangeBanner} type={"file"} ref={bannerFileRef}
                                               accept={"image/*"} className={"hidden"}/>

                                        <button
                                            disabled={loading.banner}
                                            onClick={() => bannerFileRef?.current?.click()}
                                            className="flex cursor-pointer h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3">
                                            {loading.banner ?
                                                <Loader2 className="h-4 w-4 animate-spin"/> : "Click to upload file"}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            target={"_blank"}
                                            href={addData.banner.url}
                                            className="flex cursor-not-allowed opacity-75 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3">
                                            {addData.banner.file_name}
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description"
                                       className="text-right align-text-top h-full text-nowrap">
                                    Detay Görselleri
                                </Label>

                                <div className="col-span-3 px-3 py-2 rounded border flex flex-col gap-2">
                                    {addData.images.map(({url, file_name}, index) => (
                                        <React.Fragment key={index}>
                                            <input
                                                onChange={(e) => handleChangeImages(e, index)}
                                                type="file"
                                                ref={(el) => (imagesRef.current[index] = el as HTMLInputElement)}
                                                accept="image/*"
                                                className="hidden"
                                            />

                                            <button
                                                disabled={url !== ""}
                                                onClick={() => imagesRef?.current[index]?.click()}
                                                className="flex cursor-pointer h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                                            >
                                                {url !== "" ? file_name : "Resim yükle"}
                                            </button>
                                        </React.Fragment>
                                    ))}


                                    <div
                                        onClick={() => {
                                            setAddData((prev) => ({
                                                ...prev,
                                                images: [...prev.images, {
                                                    url: "",
                                                    file_name: "",
                                                    file_extension: "",
                                                }]
                                            }))
                                        }}
                                        className={"flex items-center gap-2 text-sm justify-center w-full py-2 border rounded hover:bg-border transition-all duration-300 cursor-pointer"}>
                                        <PlusCircle size={16}/>
                                        Görsel Ekle
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className={"text-nowrap text-right"} htmlFor="price">
                                    Ölçüler
                                </Label>

                                Ölçüler
                            </div>
                        </div>
                        <DialogFooter className={'flex items-center gap-2'}>
                            <DialogClose>
                                <Button onClick={() => resetData()} variant={'destructive'}>
                                    Iptal
                                </Button>
                            </DialogClose>

                            <DialogClose>
                                <Button onClick={handleAddProduct} type="submit">Kaydet</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Table>
                    <TableCaption>Urunleri listeleyin ve yeni urunler ekleyin.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Banner</TableHead>
                            <TableHead>Images</TableHead>
                            <TableHead className={"max-w-[60px]"}>Colors</TableHead>
                            <TableHead>Stocks</TableHead>
                            <TableHead>Default Size</TableHead>
                            <TableHead>Sizes</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell className="font-medium">%{product.discount}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <Link className={"text-blue-500 font-medium"} target={"_blank"}
                                          href={product.banner.url}>View Banner Image</Link>
                                </TableCell>

                                <TableCell className={"flex flex-col"}>
                                    {
                                        //@ts-ignore
                                        product?.images?.map(({url}, index: number) => {
                                            return <Link key={index} className={"text-blue-500 text-xs font-medium"}
                                                         target={"_blank"} href={url}>View Image {index}</Link>
                                        })}
                                </TableCell>
                                <TableCell className={"flex flex-wrap max-w-[60px]"}>
                                    {
                                        //@ts-ignore
                                        product?.colors?.map((color, index: number) => {
                                            return <span key={index} className={`w-3 h-3 rounded-full bg-[${color}]`}/>
                                        })}
                                </TableCell>
                                <TableCell className={"flex flex-col"}>
                                    {
                                        //@ts-ignore
                                        product?.stocks?.map((stock, index: number) => {
                                            return <span key={index}
                                                         className={"text-xs font-medium"}>{stock.dimension} - {stock.count}</span>
                                        })}
                                </TableCell>
                                <TableCell>{product.defaultSizeId.dimensions}</TableCell>
                                <TableCell className={"flex flex-col"}>
                                    {
                                        //@ts-ignore
                                        product?.sizes?.map((size, index: number) => {
                                            return <span key={index}
                                                         className={"text-xs font-medium"}>{size.dimensions}</span>
                                        })}
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteProduct(product.id)}>Sil</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ProductDashboardPage