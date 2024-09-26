type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    banner: string
    products: ProductType[];
}

type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [string];
    tags: [string];
    sizes: [string];
    colors: [string];
    status: string;
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
}

type OrderColumnType = {
    _id: string
    customer: string
    products: number
    totalAmount: number
    createdAt: Date
}

type OrderDetailType = {
    _id: string
    customer: string,
    products: OrderItemType[],
    totalAmount: number,
    address: string,
    email: string,
    phone: string,
    createdAt: Date
}
type OrderItemType = {
    product: ProductType
    color: string;
    size: string;
    quantity: number;
}

type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
}