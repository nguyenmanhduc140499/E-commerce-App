import { GetOrderDetailDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextRequest, NextResponse } from "next/server";

// Order details
export const GET = async (req: NextRequest,
    { params }: { params: { orderId: string } }) => {
    try {
        const GET_ORDER_DETAIL_QUERY = GetOrderDetailDocument
        const variables = {
            detailsOrderInput: { orderId: params.orderId }
        };

        try {
            const { data } = await client.query({
                query: GET_ORDER_DETAIL_QUERY,
                variables
            });
            if (!data.getOrderDetails.order) {
                return new NextResponse(JSON.stringify({ message: "Order not found" }), { status: 400 })
            }
            return NextResponse.json(data.getOrderDetails.order, { status: 200 })
        } catch (Error) {
            console.error("Error during query order detail:", Error);
            return new NextResponse("Error during query order detail", { status: 500 });
        }
    } catch (error) {
        console.log("[Order_Detail_GET]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";
