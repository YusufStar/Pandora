"use client"
import {create} from 'zustand';
import {products as mock_products, sizes} from "@/zustand/mock-products";

type Product = {
    product: any;
    quantity: number;
};

type BasketStore = {
    products: Product[];
    addToBasket: (product: Product) => void;
    removeFromBasket: (productId: number) => void;
    clearBasket: () => void;
};

const useBasketStore = create<BasketStore>((set) => ({
    products: [],
    addToBasket: (product) =>
        set((state) => ({
            products: [...state.products, product],
        })),
    removeFromBasket: (productId) =>
        set((state) => ({
            products: state.products.filter((_, index) => index !== productId),
        })),
    clearBasket: () =>
        set({
            products: [],
        }),
}));

export const getProduct = (products : Product[]) => {
    const new_data = products.map(item => {
        const product_id = item.product.product_id;
        const size_id = item.product.size_id;
        const product_data = mock_products.filter((product) => product.id === Number(product_id))[0]

        const updatedItem = {
            ...item,
            product: product_data,
            size: sizes[size_id],
            m2: Number(cmToSquareMeter(sizes[size_id]).toFixed(2)),
            sizes: product_data.sizes.map((id) => sizes[id])
        };

        return updatedItem;
    });

    return new_data;
}

export function cmToSquareMeter(dimensions: string): number {
    const [width, height] = dimensions.split('x').map(dimension => parseFloat(dimension.trim()));

    return (width / 100) * (height / 100);
}

export const calculateTotalPrice = (products : Product[]) => {
    const data = getProduct(products)
    let totalPrice = 0;

    if (data.length < 1) {
        return formatCurrency(0)
    }

    // Sepetteki her ürünün fiyatını topla
    data.forEach(item => {
        const product = item.product;
        const quantity = item.quantity;
        const m2 = Number(item.m2.toFixed(2))

        // Ürünün indirimli fiyatını miktarla çarp ve toplam fiyata ekle
        totalPrice += useDiscount(product.price * m2, product.discount) * quantity;
    });

    return formatCurrency(totalPrice);
}

export const formatCurrency = (number: number) =>  {
    const formated = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
    }).format(number);

    return formated;
}

export const useDiscount = (price: number, discount: number) =>  price - (price * (discount / 100));

export default useBasketStore;
