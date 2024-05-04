"use client"

import {useEffect, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const SizeDashboardPage = () => {
    const [sizes, setSizes] = useState<null | any[]>(null);

    const getData = async () => {
        const response = await fetch(`/api/sizes`, {
            mode: "no-cors",
        }).then((x) => x.json());
        setSizes(response.data);
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
                            <TableHead>Dimension</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sizes && sizes.map((size) => (
                            <TableRow key={size.id}>
                                <TableCell className="font-medium">{size.id}</TableCell>
                                <TableCell>{size.dimension}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default SizeDashboardPage