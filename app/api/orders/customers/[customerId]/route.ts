import { NextRequest, NextResponse } from 'next/server';
import { GetOrderByCustomerDocument } from "@/generated/graphql"
import client from '@/lib/apolloClient';

export const GET = async (req: NextRequest, { params }: { params: { customerId: string } }) => {
    try {
        const GET_ORDER_BY_CUSTOMER = GetOrderByCustomerDocument
        const variables = { customerClerkId: params.customerId }

        const { data, errors } = await client.query({
            query: GET_ORDER_BY_CUSTOMER,
            variables
        })

        if (errors) {
            return NextResponse.json(errors[0].message, {
                status: 500,
            });
        }
        return NextResponse.json(data.getOrderByCustomer.listOrder, { status: 200 })

    } catch (error) {
        console.log("Order_By_Customer_GET")
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}
export const dynamic = "force-dynamic";
