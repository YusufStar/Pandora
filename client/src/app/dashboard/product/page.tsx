"use client"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useEffect, useState} from "react";
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
import {MoreHorizontal, Plus} from "lucide-react";
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


const ProductDashboardPage = () => {
    const [products, setProducts] = useState<null | any[]>(null);
    const [addData, setAddData] = useState({
        brand: "",
        discount: 0,
        description: "",
        banner: {
            url: "",
            file_name: "",
            file_extension: "",
        },
        images: [],
        colors: [],
        stocks: [],
        defaultSizeId: 0,
        sizes: [],
    })

    const getData = async () => {
        const response = await fetch(`/api/products`, {
            mode: "no-cors",
        }).then((x) => x.json());
        setProducts(response.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const resetData = () => {
        setAddData({
            brand: "",
            discount: 0,
            description: "",
            banner: {
                url: "",
                file_name: "",
                file_extension: "",
            },
            images: [],
            colors: [],
            stocks: [],
            defaultSizeId: 0,
            sizes: [],
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
                                <Label className={"text-nowrap"} htmlFor="brand" className="text-right">
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
                                <Label className={"text-nowrap"} htmlFor="discount" className="text-right">
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
                                <Label className={"text-nowrap"} htmlFor="description" className="text-right">
                                    Açıklama
                                </Label>
                                <Input
                                    id="description"
                                    placeholder={'10'}
                                    min={0}
                                    max={100}
                                    value={addData.description}
                                    onChange={(e) => changeData("description", e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description"
                                       className="text-right text-nowrap">
                                    Kapak Görseli
                                </Label>
                                <Input
                                    id="description"
                                    placeholder={'10'}
                                    min={0}
                                    max={100}
                                    value={addData.description}
                                    type={"file"}
                                    onChange={(e) => changeData("description", e.target.value)}
                                    className="col-span-3"
                                />
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