import { NextRequest, NextResponse } from "next/server";
import { convertZaloResData, verifyZaloPayRes } from "@/lib/common";
import { CreateOrderDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";

export const POST = async (req: NextRequest) => {
    if (req.method === 'POST') {
        const { data, mac } = await req.json();
        // Verify the payment result
        const res = verifyZaloPayRes(data, mac)
        if (res.return_code === 1) {
            //create order
            const resOrderData = convertZaloResData(data)
            const CREATE_ORDER_MUTATION = CreateOrderDocument
            const variables = {
                createOrderInput: {
                    customerClerkId: resOrderData.clerkUserId,
                    totalAmount: resOrderData.amount,
                    customerName: resOrderData.name,
                    address: resOrderData.address,
                    email: resOrderData.email,
                    phone: resOrderData.phone,
                    products: resOrderData.products
                },
            };
            try {
                const { data, errors } = await client.mutate({
                    mutation: CREATE_ORDER_MUTATION,
                    variables,
                });

                if (!data.createOrder.success) {
                    return new NextResponse(data.createOrder.message, {
                        status: data.createOrder.code,
                    });
                }
                if (errors) {
                    return NextResponse.json(errors[0].message, {
                        status: 500,
                    });
                }
                return NextResponse.json({ return_code: 1, return_message: 'Payment success' }, { status: 200 })
            } catch (error) {
                console.error("Error during mutation:", error);
                return new NextResponse("Error during create order", { status: 500 });
            }
        }
        else {
            return NextResponse.json({ return_code: 2, return_message: 'Payment fail' })
        }
    } else {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }
}
