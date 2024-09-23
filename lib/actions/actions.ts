
export const getTotalSales = async () => {
    let totalOrders = 0
    let totalRevenue = 0
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
    if (!res.ok) {
        console.error(`Failed to fetch orders: ${res.statusText}`);
        return { totalOrders, totalRevenue };
    }
    const orders = await res.json();
    totalOrders = orders.length;
    totalRevenue = orders.reduce((acc: number, order: OrderColumnType) => acc + order.totalAmount, 0)
    return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`);
    if (!res.ok) {
        console.error(`Failed to fetch customers: ${res.statusText}`);
        return 0;
    }
    const customers = await res.json();
    const totalCustomers = customers.length
    return totalCustomers
}

export const getSalesPerMonth = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
    if (!res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a: any[] = []
        return a
    }
    const orders = await res.json();
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