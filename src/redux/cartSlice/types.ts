export type CartItem = {
    id: string;
    title: string;
    type: number;
    price: number;
    size: number;
    imageUrl: string;
    count: number;
};

export type CartSliceState = {
    totalPrice: number;
    items: CartItem[];
};