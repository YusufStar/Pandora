"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import Link from "next/link";


const ProductDashboardPage = () => {
    const [products, setProducts] = useState<null | any[]>(null);

    const getData = async () => {
        const response = await fetch(`/api/products`, {
            mode: "no-cors",
        }).then((x) => x.json());
        setProducts(response.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={"p-4 w-full h-full flex items-center justify-center"}>
            <div className="mx-auto max-w-screen-xl overflow-y-auto h-full w-full border rounded">
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products && products.map((product) => (
                            <TableRow>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell className="font-medium">%{product.discount}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    <Link className={"text-blue-500 font-medium"} target={"_blank"} href={product.banner.url}>View Banner Image</Link>
                                </TableCell>

                                <TableCell className={"flex flex-col"}>
                                    {
                                        //@ts-ignore
                                        product?.images?.map(({url}, index: number) => {
                                        return <Link key={index} className={"text-blue-500 text-xs font-medium"} target={"_blank"} href={url}>View Image {index}</Link>
                                    })}
                                </TableCell>
                                <TableCell className={"flex flex-wrap max-w-[60px]"}>
                                    {
                                        //@ts-ignore
                                        product?.colors?.map((color, index: number) => {
                                            return <span key={index} className={`w-3 h-3 rounded-full bg-[${color}]`} />
                                        })}
                                </TableCell>
                                <TableCell className={"flex flex-col"}>
                                    {
                                        //@ts-ignore
                                        product?.stocks?.map((stock, index: number) => {
                                            return <span key={index} className={"text-xs font-medium"}>{stock.dimension} - {stock.count}</span>
                                        })}
                                </TableCell>
                                <TableCell>{product.defaultSizeId.dimensions}</TableCell>
                                <TableCell className={"flex flex-col"}>
                                    {
                                        //@ts-ignore
                                        product?.sizes?.map((size, index: number) => {
                                            return <span key={index} className={"text-xs font-medium"}>{size.dimensions}</span>
                                        })}
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