"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SizeDashboardPage = () => {
  const [features, setFeatures] = useState<null | any[]>(null);
  const [newCategory, setNewCategory] = useState("");

  const getData = async () => {
    const response = await fetch(`/api/features`, {
      mode: "no-cors",
    }).then((x) => x.json());
    setFeatures(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddSize = async () => {
    const promise = fetch("/api/features", {
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify({
        title: newCategory,
      }),
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        setNewCategory("");
        getData();
        return `Yeni ozellik eklendi.`;
      },
      error: () => {
        setNewCategory("");
        return "Hatalı ozellik.";
      },
    });
  };

  const handleDeleteSize = async (id: number) => {
    const promise = fetch("/api/features", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: (data) => {
        setNewCategory("");
        getData();
        return `Ozellik silindi..`;
      },
      error: () => {
        setNewCategory("");
        return "Hatalı ozellik.";
      },
    });
  };

  return (
    <div className={"p-4 w-full h-full flex items-center justify-center"}>
      <div className="mx-auto max-w-xl h-fit w-full border rounded relative">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={"w-8 h-8 rounded-full absolute -top-4 -right-4"}
              size="icon"
            >
              <Plus size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni Ozellik Gir</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feature" className="text-right">
                  Ozellik
                </Label>
                <Input
                  id="feature"
                  placeholder={"leke tutmaz"}
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className={"flex items-center gap-2"}>
              <DialogClose>
                <Button
                  onClick={() => setNewCategory("")}
                  variant={"destructive"}
                >
                  Iptal
                </Button>
              </DialogClose>

              <DialogClose>
                <Button onClick={handleAddSize} type="submit">
                  Kaydet
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Table>
          <TableCaption>
            Ölçüleri listeleyin ve yeni urunler ekleyin.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Dimension</TableHead>
              <TableHead>Metrekare</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features &&
              features.map((feature) => (
                <TableRow key={feature.id}>
                  <TableCell className="font-medium">{feature.id}</TableCell>
                  <TableCell>{feature.title}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteSize(feature.id)}
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

export default SizeDashboardPage;
