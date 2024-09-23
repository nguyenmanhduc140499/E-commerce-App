import { GetListOrderDocument, GetListUserDocument } from "@/generated/graphql";
import client from "../apolloClient";

export const getTotalSales = async () => {
    let totalOrders = 0
    let totalRevenue = 0
    const GET_ORDERS_QUERY = GetListOrderDocument;
    const { data, errors } = await client.query({
        query: GET_ORDERS_QUERY,
    });
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, { method: "GET", cache: "no-cache" });
    if (!data) {
        console.error(`Failed to fetch orders: ${errors}`);
        return { totalOrders, totalRevenue };
    }
    const orders = data.getListOrder.listOrder;
    totalOrders = orders.length;
    totalRevenue = orders.reduce((acc: number, order: OrderColumnType) => acc + order.totalAmount, 0)
    return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
    const GET_USERS_QUERY = GetListUserDocument;
    const { data, errors } = await client.query({
        query: GET_USERS_QUERY,
    });
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, { method: "GET", cache: "no-cache" });
    if (!data) {
        console.error(`Failed to fetch customers: ${errors}`);
        return 0;
    }
    const customers = data.getListUser.listUser
    const totalCustomers = customers.length
    return totalCustomers
}

export const getSalesPerMonth = async () => {
    const GET_ORDERS_QUERY = GetListOrderDocument;
    const { data, errors } = await client.query({
        query: GET_ORDERS_QUERY,
    });
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, { method: "GET", cache: "no-cache" });
    if (!data) {
        console.error(`Failed to fetch orders: ${errors}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a: any[] = []
        return a
    }
    const orders = data.getListOrder.listOrder
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const salesPerMonth = orders.reduce((acc: any, order: any) => {
        const cleanedDateString = order.createdAt.replace(/(\d+)(st|nd|rd|th)/, '$1');
        const monthIndex = new Date(cleanedDateString).getMonth(); // 0 for Janruary --> 11 for December
        acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
        return acc
    }, {})

    const graphData = Array.from({ length: 12 }, (_, i) => {
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
        return { name: month, sales: salesPerMonth[i] || 0 }
    })
    return graphData
}