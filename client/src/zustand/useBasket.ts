"use client"
import {create} from 'zustand';
import {products as mock_products, sizes} from "@/zustand/mock-products";

type BasketStore = {
    products: any[];
    setBasket: (product: any[]) => void;
};

const useBasketStore = create<BasketStore>((set) => ({
    products: [],
    setBasket: (products) =>
        set((state) => ({
            products: products,
        }))
}));

export const getProduct = (products: any[]) => {
    const new_data = products.map(item => {
        const updatedItem = {
            ...item,
            product: item,
            size: item.size.dimensions,
            m2: cmToSquareMeter(item.size.dimensions)
        };

        return updatedItem;
    });

    return new_data;
}

export function cmToSquareMeter(dimensions: string): number {
    const [width, height] = dimensions.split('x').map(dimension => parseFloat(dimension.trim()));

    return (width / 100) * (height / 100);
}

export const calculateTotalPrice = (products: any[]) => {
    const data = getProduct(products)
    let totalPrice = 0;

    if (data.length === 0) {
        return formatCurrency(0)
    }

    // Sepetteki her ürünün fiyatını topla
    data.forEach(item => {
        const quantity = item.quantity;
        const m2 = Number(item.m2.toFixed(2))
        const product = item.product

        totalPrice += useDiscount(product.product.price * m2, product.product.discount) * quantity;
    });

    return formatCurrency(totalPrice);
}

export const formatCurrency = (number: number) => {
    const formated = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
    }).format(number);

    return formated;
}

export const useDiscount = (price: number, discount: number) => price - (price * (discount / 100));

export default useBasketStore;
