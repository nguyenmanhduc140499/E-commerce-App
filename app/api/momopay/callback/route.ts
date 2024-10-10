import { ActiveOrderDocument } from "@/generated/graphql"
import client from "@/lib/apolloClient"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    const resData = await req.json()
    try {
        if (resData.resultCode === 0) {
            const ACTIVE_ORDER = ActiveOrderDocument
            const variables = {
                activeOrder: {
                    orderId: resData.orderId,
                },
            };
            const { data, errors } = await client.mutate({
                mutation: ACTIVE_ORDER,
                variables,
            });

            if (!data.activeOrder.success) {
                return new NextResponse(data.activeOrder.message, {
                    status: data.activeOrder.code,
                });
            }
            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }
            return NextResponse.json({ status: 200 })
        }
    } catch (error) {
        console.error("Error during active order:", error);
        return new NextResponse("Error during active order", { status: 500 });
    }
}