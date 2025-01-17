"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {RefObject, useEffect, useRef, useState} from "react";
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
    DialogTrigger,
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {createClient} from "@supabase/supabase-js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";

const ProductDashboardPage = () => {
    const supabase = createClient(
        "https://ipjfbfzysroitylwokvj.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwamZiZnp5c3JvaXR5bHdva3ZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzgwMjMxNiwiZXhwIjoyMDI5Mzc4MzE2fQ.rsBA9PMr3zGMT5ZD1TiJDA2_gUwpY32JhEJFlwUKlNA"
    );

    const bannerFileRef = useRef<null | HTMLInputElement>(null);
    const imagesRef: RefObject<(HTMLInputElement | null)[]> = useRef([]);

    const [color, setColor] = useState("");
    const [products, setProducts] = useState<null | any[]>(null);
    const [sizes, setSizes] = useState<null | any[]>();
    const [category, setCategories] = useState<null | any[]>();
    const [usage, setUsage] = useState<null | any[]>();
    const [features, setFeatures] = useState<null | any[]>();
    const [loading, setLoading] = useState({
        banner: false,
    });

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
            },
        ],
        defaultSizeId: 0,
        sizes: [null],
        category: [null],
        usage: [null],
        features: [null],
        colors: [],
    });

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
            return {value: size.id, label: size.dimensions};
        });
        setSizes(y);
    };

    const getUsage = async () => {
        const response = await fetch(`/api/usage`, {
            mode: "no-cors",
        }).then((x) => x.json());
        const y = response.data?.map((usage: any) => {
            return {value: usage.id, label: usage.title};
        });
        setUsage(y);
    };

    const getCategory = async () => {
        const response = await fetch(`/api/category`, {
            mode: "no-cors",
        }).then((x) => x.json());
        const y = response.data?.map((category: any) => {
            return {value: category.id, label: category.title};
        });
        setCategories(y);
    };

    const getFeatures = async () => {
        const response = await fetch(`/api/features`, {
            mode: "no-cors",
        }).then((x) => x.json());
        const y = response.data?.map((features: any) => {
            return {value: features.id, label: features.title};
        });
        setFeatures(y);
    };

    useEffect(() => {
        getData();
        getSizes();
        getCategory();
        getFeatures();
        getUsage()
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
                },
            ],
            defaultSizeId: 0,
            sizes: [null],
            category: [null],
            usage: [null],
            features: [null],
            colors: [],
        });
    };

    const handleAddProduct = async () => {
        const promise = fetch("/api/products", {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify({
                newData: addData,
            }),
        });

        toast.promise(promise, {
            loading: "Loading...",
            success: () => {
                resetData();
                getData();
                return `Yeni Urun eklendi.`;
            },
            error: () => {
                resetData();
                return "Veri de hata var.";
            },
        });
    };

    const handleDeleteProduct = async (id: number) => {
        const promise = fetch("/api/products", {
            method: "DELETE",
            body: JSON.stringify({
                id: id,
            }),
        });

        toast.promise(promise, {
            loading: "Loading...",
            success: (data) => {
                resetData();
                getData();
                return `Urun silindi..`;
            },
            error: () => {
                resetData();
                return "Urun Silinirken bir hata olustu.";
            },
        });
    };

    const handleChangeBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading((prev) => ({...prev, banner: true}));

        // @ts-ignore
        const file = e.target.files[0] as File;

        // @ts-ignore
        const {data, error} = await supabase.storage
            .from("images")
            .upload(`public/${crypto.randomUUID()}`, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (data) {
            await fetch("/api/file", {
                method: "POST",
                body: JSON.stringify({
                    url: `https://ipjfbfzysroitylwokvj.supabase.co/storage/v1/object/public/${
                        (data as any)?.fullPath
                    }`,
                    file_name: file.name,
                    file_extension: file.type,
                }),
            })
                .then((res) => res.json())
                .then((res) => changeData("banner", res.data));
        }

        setLoading((prev) => ({...prev, banner: false}));
    };

    const handleChangeImages = async (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        // @ts-ignore
        const file = e.target.files[0] as File;

        // @ts-ignore
        const {data, error} = await supabase.storage
            .from("images")
            .upload(`public/${crypto.randomUUID()}`, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (data) {
            await fetch("/api/file", {
                method: "POST",
                body: JSON.stringify({
                    url: `https://ipjfbfzysroitylwokvj.supabase.co/storage/v1/object/public/${
                        (data as any)?.fullPath
                    }`,
                    file_name: file.name,
                    file_extension: file.type,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    setAddData((prev) => {
                        const updatedImages = [...prev.images];
                        updatedImages[index] = res.data;
                        return {...prev, images: updatedImages};
                    });
                });
        }
    };

    const changeData = (key: string, value: any) => {
        setAddData((prev) => ({...prev, [key]: value}));
    };

    return (
        <div className={"p-4 w-full h-full flex items-center justify-center"}>
            <div
                className="mx-auto max-w-screen-2xl max-h-[900px] overflow-y-auto w-full overflow-x-hidden border rounded relative">
                <Table>
                    <TableCaption>
                        Urunleri listeleyin ve yeni urunler ekleyin.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Banner</TableHead>
                            <TableHead>Images</TableHead>
                            <TableHead>Default Size</TableHead>
                            <TableHead>Sizes</TableHead>
                            <TableHead>Categories</TableHead>
                            <TableHead>Features</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Colors</TableHead>
                            <TableHead>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className={"w-8 h-8"} size="icon">
                                            <Plus size={18}/>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle>Yeni Ölçü Gir</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when
                                                you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="brand"
                                                >
                                                    Marka
                                                </Label>
                                                <Input
                                                    id="brand"
                                                    placeholder={"Pandora Halı"}
                                                    value={addData.brand}
                                                    onChange={(e) => changeData("brand", e.target.value)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="discount"
                                                >
                                                    Indirim
                                                </Label>
                                                <Input
                                                    id="discount"
                                                    placeholder={"10"}
                                                    min={0}
                                                    max={100}
                                                    type={"number"}
                                                    value={addData.discount}
                                                    onChange={(e) =>
                                                        changeData("discount", e.target.value)
                                                    }
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="description"
                                                >
                                                    Açıklama
                                                </Label>
                                                <Input
                                                    id="description"
                                                    placeholder={"Açıklama"}
                                                    min={0}
                                                    max={100}
                                                    value={addData.description}
                                                    onChange={(e) =>
                                                        changeData("description", e.target.value)
                                                    }
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="price"
                                                >
                                                    Fiyat
                                                </Label>
                                                <Input
                                                    id="price"
                                                    placeholder={"Fiyat"}
                                                    min={0}
                                                    max={100}
                                                    type={"number"}
                                                    value={addData.price}
                                                    onChange={(e) => changeData("price", e.target.value)}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="description"
                                                    className="text-right text-nowrap"
                                                >
                                                    Kapak Görseli
                                                </Label>

                                                {addData.banner.url === "" ? (
                                                    <>
                                                        <input
                                                            onChange={handleChangeBanner}
                                                            type={"file"}
                                                            ref={bannerFileRef}
                                                            accept={"image/*"}
                                                            className={"hidden"}
                                                        />

                                                        <button
                                                            disabled={loading.banner}
                                                            onClick={() => bannerFileRef?.current?.click()}
                                                            className="flex cursor-pointer h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                                                        >
                                                            {loading.banner ? (
                                                                <Loader2 className="h-4 w-4 animate-spin"/>
                                                            ) : (
                                                                "Click to upload file"
                                                            )}
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link
                                                            target={"_blank"}
                                                            href={addData.banner.url}
                                                            className="flex cursor-not-allowed opacity-75 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                                                        >
                                                            {addData.banner.file_name}
                                                        </Link>
                                                    </>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="description"
                                                    className="text-right align-text-top h-full text-nowrap"
                                                >
                                                    Detay Görselleri
                                                </Label>

                                                <div
                                                    className="col-span-3 px-3 py-2 rounded border flex flex-col gap-2">
                                                    {addData.images.map(({url, file_name}, index) => (
                                                        <React.Fragment key={index}>
                                                            {
                                                                // @ts-ignore
                                                                <input
                                                                    onChange={(e) => handleChangeImages(e, index)}
                                                                    type="file"
                                                                    // @ts-ignore
                                                                    ref={(el: HTMLInputElement) => {
                                                                        if (imagesRef.current) {
                                                                            imagesRef.current[index] = el;
                                                                        }
                                                                    }}
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                />
                                                            }

                                                            {
                                                                // @ts-ignore
                                                                <button
                                                                    disabled={url !== ""}
                                                                    onClick={() =>
                                                                        // @ts-ignore
                                                                        imagesRef?.current[index]?.click()
                                                                    }
                                                                    className="flex cursor-pointer h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                                                                >
                                                                    {url !== "" ? file_name : "Resim yükle"}
                                                                </button>
                                                            }
                                                        </React.Fragment>
                                                    ))}

                                                    <div
                                                        onClick={() => {
                                                            setAddData((prev) => ({
                                                                ...prev,
                                                                images: [
                                                                    ...prev.images,
                                                                    {
                                                                        url: "",
                                                                        file_name: "",
                                                                        file_extension: "",
                                                                    },
                                                                ],
                                                            }));
                                                        }}
                                                        className={
                                                            "flex items-center gap-2 text-sm justify-center w-full py-2 border rounded hover:bg-border transition-all duration-300 cursor-pointer"
                                                        }
                                                    >
                                                        <PlusCircle size={16}/>
                                                        Görsel Ekle
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="price"
                                                >
                                                    Ölçüler
                                                </Label>

                                                <div className="flex flex-col gap-2 w-full col-span-3">
                                                    {addData.sizes.map((size, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    // @ts-ignore
                                                                    <Select
                                                                        value={size === null ? undefined : size}
                                                                        onValueChange={(val) => {
                                                                            setAddData((prev) => {
                                                                                const updatedSizes = [...prev.sizes];
                                                                                // @ts-ignore
                                                                                updatedSizes[index] = val;
                                                                                return {...prev, sizes: updatedSizes};
                                                                            });
                                                                        }}
                                                                    >
                                                                        <SelectTrigger className="col-span-3">
                                                                            <SelectValue placeholder="Tüm ölçüler"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {sizes?.map((size) => (
                                                                                <SelectItem value={size.value}>
                                                                                    {size.label}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                }
                                                            </>
                                                        );
                                                    })}

                                                    <div
                                                        onClick={() => {
                                                            setAddData((prev) => ({
                                                                ...prev,
                                                                sizes: [...prev.sizes, null],
                                                            }));
                                                        }}
                                                        className={
                                                            "flex items-center gap-2 text-sm justify-center w-full py-2 border rounded hover:bg-border transition-all duration-300 cursor-pointer"
                                                        }
                                                    >
                                                        <PlusCircle size={16}/>
                                                        Ölçü ekle
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="feature"
                                                >
                                                    Kategoriler
                                                </Label>

                                                <div className="flex flex-col gap-2 w-full col-span-3">
                                                    {addData.category.map((ct, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    // @ts-ignore
                                                                    <Select
                                                                        value={ct === null ? undefined : ct}
                                                                        onValueChange={(val) => {
                                                                            setAddData((prev) => {
                                                                                const updatedCategory = [
                                                                                    ...prev.category,
                                                                                ];
                                                                                // @ts-ignore
                                                                                updatedCategory[index] = val;
                                                                                return {
                                                                                    ...prev,
                                                                                    category: updatedCategory,
                                                                                };
                                                                            });
                                                                        }}
                                                                    >
                                                                        <SelectTrigger className="col-span-3">
                                                                            <SelectValue placeholder="Tüm ölçüler"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {category?.map((data) => (
                                                                                <SelectItem value={data.value}>
                                                                                    {data.label}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                }
                                                            </>
                                                        );
                                                    })}

                                                    <div
                                                        onClick={() => {
                                                            setAddData((prev) => ({
                                                                ...prev,
                                                                category: [...prev.category, null],
                                                            }));
                                                        }}
                                                        className={
                                                            "flex items-center gap-2 text-sm justify-center w-full py-2 border rounded hover:bg-border transition-all duration-300 cursor-pointer"
                                                        }
                                                    >
                                                        <PlusCircle size={16}/>
                                                        Ölçü ekle
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="feature"
                                                >
                                                    Kullanım alanları
                                                </Label>

                                                <div className="flex flex-col gap-2 w-full col-span-3">
                                                    {addData.usage.map((ct, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    // @ts-ignore
                                                                    <Select
                                                                        value={ct === null ? undefined : ct}
                                                                        onValueChange={(val) => {
                                                                            setAddData((prev) => {
                                                                                const updatedUsage = [
                                                                                    ...prev.usage,
                                                                                ];
                                                                                // @ts-ignore
                                                                                updatedUsage[index] = val;
                                                                                return {
                                                                                    ...prev,
                                                                                    usage: updatedUsage,
                                                                                };
                                                                            });
                                                                        }}
                                                                    >
                                                                        <SelectTrigger className="col-span-3">
                                                                            <SelectValue placeholder="Tüm ölçüler"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {usage?.map((data) => (
                                                                                <SelectItem value={data.value}>
                                                                                    {data.label}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                }
                                                            </>
                                                        );
                                                    })}

                                                    <div
                                                        onClick={() => {
                                                            setAddData((prev) => ({
                                                                ...prev,
                                                                usage: [...prev.usage, null],
                                                            }));
                                                        }}
                                                        className={
                                                            "flex items-center gap-2 text-sm justify-center w-full py-2 border rounded hover:bg-border transition-all duration-300 cursor-pointer"
                                                        }
                                                    >
                                                        <PlusCircle size={16}/>
                                                        Kullanım Alanı ekle
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    className={"text-nowrap text-right"}
                                                    htmlFor="feature"
                                                >
                                                    Ozellikler
                                                </Label>

                                                <div className="flex flex-col gap-2 w-full col-span-3">
                                                    {addData.features.map((feature, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    // @ts-ignore
                                                                    <Select
                                                                        value={
                                                                            feature === null ? undefined : feature
                                                                        }
                                                                        onValueChange={(val) => {
                                                                            setAddData((prev) => {
                                                                                const updatedFeatures = [
                                                                                    ...prev.features,
                                                                                ];
                                                                                // @ts-ignore
                                                                                updatedFeatures[index] = val;
                                                                                return {
                                                                                    ...prev,
                                                                                    features: updatedFeatures,
                                                                                };
                                                                            });
                                                                        }}
                                                                    >
                                                                        <SelectTrigger className="col-span-3">
                                                                            <SelectValue placeholder="Tüm ölçüler"/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {features?.map((feature) => (
                                                                                <SelectItem value={feature.value}>
                                                                                    {feature.label}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                }
                                                            </>
                                                        );
                                                    })}

                                                    <div
                                                        onClick={() => {
                                                            setAddData((prev) => ({
                                                                ...prev,
                                                                features: [...prev.features, null],
                                                            }));
                                                        }}
                                                        className={
                                                            "flex items-center gap-2 text-sm justify-center w-full py-2 border rounded hover:bg-border transition-all duration-300 cursor-pointer"
                                                        }
                                                    >
                                                        <PlusCircle size={16}/>
                                                        Ölçü ekle
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="description"
                                                    className="text-right align-text-top h-full text-nowrap"
                                                >
                                                    Renkler
                                                </Label>

                                                <div
                                                    className="col-span-3 flex flex-col px-3 py-2 rounded border flex flex-col gap-2">
                                                    <div className="flex flex-wrap w-full gap-2">
                                                        {addData.colors.map((color, index) => {
                                                            if (Array.isArray(color)) {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            "flex w-6 h-6 rounded-full border"
                                                                        }
                                                                    >
                                    <span
                                        className={"w-full h-full rounded-l-full"}
                                        style={{backgroundColor: color[0]}}
                                    />

                                                                        <span
                                                                            className={"w-full h-full rounded-r-full"}
                                                                            style={{backgroundColor: color[1]}}
                                                                        />
                                                                    </div>
                                                                );
                                                            } else {
                                                                return (
                                                                    <span
                                                                        className={"w-6 h-6 rounded-full border"}
                                                                        style={{backgroundColor: color}}
                                                                    />
                                                                );
                                                            }
                                                        })}
                                                    </div>

                                                    <Input
                                                        name={`color`}
                                                        placeholder="Renkler , ile ayiriniz."
                                                        value={color}
                                                        onChange={(e) => setColor(e.target.value)}
                                                    />

                                                    <Button
                                                        onClick={() => {
                                                            if (color.includes(",")) {
                                                                const colors_split = color.split(
                                                                    ","
                                                                ) as string[];
                                                                // @ts-ignore
                                                                setAddData((prev) => ({
                                                                    ...prev,
                                                                    colors: [...prev.colors, colors_split],
                                                                }));

                                                                setColor("");
                                                            } else {
                                                                // @ts-ignore
                                                                setAddData((prev) => ({
                                                                    ...prev,
                                                                    colors: [...prev.colors, color],
                                                                }));

                                                                setColor("");
                                                            }
                                                        }}
                                                        variant={"outline"}
                                                    >
                                                        Renkleri ekle
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter className={"flex items-center gap-2"}>
                                            <DialogClose>
                                                <Button
                                                    onClick={() => resetData()}
                                                    variant={"destructive"}
                                                >
                                                    Iptal
                                                </Button>
                                            </DialogClose>

                                            <DialogClose>
                                                <Button onClick={handleAddProduct} type="submit">
                                                    Kaydet
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products &&
                            products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell className="font-medium">
                                        %{product.discount}
                                    </TableCell>
                                    <TableCell className="font-medium">{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>

                                    <TableCell>
                                        <Link
                                            className={"text-blue-500 font-medium"}
                                            target={"_blank"}
                                            href={product.banner.url}
                                        >
                                            View Banner
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="!ring-0 p-0 outline-none hover:bg-transparent hover:opacity-75 transition-all"
                                                    variant="ghost"
                                                >
                                                    View Images
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Panel Images</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                {
                                                    //@ts-ignore
                                                    product?.images?.map(({url}, index: number) => {
                                                        return (
                                                            <DropdownMenuItem>
                                                                <Link
                                                                    key={index}
                                                                    className={
                                                                        "text-blue-500 text-sm w-full h-full font-medium"
                                                                    }
                                                                    target={"_blank"}
                                                                    href={url}
                                                                >
                                                                    Image {index}
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        );
                                                    })
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                    <TableCell>{product.defaultSizeId.dimensions}</TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="!ring-0 p-0 outline-none hover:bg-transparent hover:opacity-75 transition-all"
                                                    variant="ghost"
                                                >
                                                    View Sizes
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Panel Sizes</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                {
                                                    //@ts-ignore
                                                    product?.sizes?.map((size: any, index: number) => {
                                                        return (
                                                            <DropdownMenuItem>
                                <span
                                    key={index}
                                    className={"text-sm font-medium"}
                                >
                                  {size.dimensions}
                                </span>
                                                            </DropdownMenuItem>
                                                        );
                                                    })
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="!ring-0 p-0 outline-none hover:bg-transparent hover:opacity-75 transition-all"
                                                    variant="ghost"
                                                >
                                                    View Categories
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Panel Categories</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                {
                                                    //@ts-ignore
                                                    product?.category?.map((ct: any, index: number) => {
                                                        return (
                                                            <DropdownMenuItem>
                                <span
                                    key={index}
                                    className={"text-sm font-medium"}
                                >
                                  {ct.title}
                                </span>
                                                            </DropdownMenuItem>
                                                        );
                                                    })
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="!ring-0 outline-none p-0 hover:bg-transparent hover:opacity-75 transition-all"
                                                    variant="ghost"
                                                >
                                                    View Features
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Panel Features</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                {
                                                    //@ts-ignore
                                                    product?.features?.map(
                                                        (feature: any, index: number) => {
                                                            return (
                                                                <DropdownMenuItem>
                                  <span
                                      key={index}
                                      className={"text-sm font-medium"}
                                  >
                                    {feature.title}
                                  </span>
                                                                </DropdownMenuItem>
                                                            );
                                                        }
                                                    )
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                    <TableCell className={"w-[8rem]"}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    className="!ring-0 p-0 outline-none hover:bg-transparent hover:opacity-75 transition-all"
                                                    variant="ghost"
                                                >
                                                    View Usage
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Panel Usage</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                {
                                                    //@ts-ignore
                                                    product?.usage?.map((usage: any, index: number) => {
                                                        return (
                                                            <DropdownMenuItem>
                                <span
                                    key={index}
                                    className={"text-sm font-medium"}
                                >
                                  {usage.title}
                                </span>
                                                            </DropdownMenuItem>
                                                        );
                                                    })
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>

                                    <TableCell className={"w-[8rem]"}>
                                        <div className="flex flex-wrap w-full gap-2">
                                            {product.colors.map((color: any, index: number) => {
                                                if (Array.isArray(color)) {
                                                    return (
                                                        <div className={"flex w-6 h-6 rounded-full border"}>
                              <span
                                  className={"w-full h-full rounded-l-full"}
                                  style={{backgroundColor: color[0]}}
                              />

                                                            <span
                                                                className={"w-full h-full rounded-r-full"}
                                                                style={{backgroundColor: color[1]}}
                                                            />
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <span
                                                            className={"w-6 h-6 rounded-full border"}
                                                            style={{backgroundColor: color}}
                                                        />
                                                    );
                                                }
                                            })}
                                        </div>
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
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    Sil
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ProductDashboardPage;
