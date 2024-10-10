import { ObjectId } from 'mongodb';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";
import { CreateOrderDocument } from '@/generated/graphql';
import client from '@/lib/apolloClient';

const corsHeaders = {
    "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL_PAGE}`,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export const POST = async (req: NextRequest) => {
    const { cartItems, customer } = await req.json();
    if (!cartItems || !customer) {
        return new NextResponse("Not enough data to checkout", { status: 400 });
    }
    const orderId = new ObjectId()
    const deliveryInfo = {
        deliveryAddress: customer.address,
        deliveryFee: 0,
    };
    const userInfo = {
        name: customer.name,
        phoneNumber: customer.phone,
        email: customer.email,
    };
    const items = cartItems.map((item: any) => {
        return {
            id: item.item,
            name: item.title,
            price: item.unitPrice,
            imageUrl: item.imageUrl,
            currency: "VND",
            quantity: item.quantity,
            unit: item.size,
            totalPrice: item.unitPrice * item.quantity,
        };
    });
    const products = cartItems.map((item: any) => {
        return {
            productId: item.item,
            quantity: item.quantity,
            color: item.color,
            size: item.size
        }
    })

    const parameters: any = {
        accessKey: process.env.MOMO_ACCESS_KEY,
        secretKey: process.env.MOMO_SECRET_KEY,
        partnerCode: process.env.MOMO_PARTNER_CODE,
        orderInfo: `Nghien store - pay with MoMo`,
        redirectUrl: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL_PAGE}/payment_success`,
        ipnUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/momopay/callback`,
        requestType: "payWithMethod",
        storeName: "Nghien store",
        items,
        deliveryInfo,
        userInfo,
        amount: customer.totalAmount,
        orderId,
        requestId: orderId,
        extraData: "",
        orderGroupId: "",
        autoCapture: true,
        lang: "vi",
    };

    //before sign HMAC SHA256 with format
    const rawSignature =
        "accessKey=" +
        parameters.accessKey +
        "&amount=" +
        parameters.amount +
        "&extraData=" +
        parameters.extraData +
        "&ipnUrl=" +
        parameters.ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        parameters.orderInfo +
        "&partnerCode=" +
        parameters.partnerCode +
        "&redirectUrl=" +
        parameters.redirectUrl +
        "&requestId=" +
        parameters.requestId +
        "&requestType=" +
        parameters.requestType;
    //signature
    const signature = crypto
        .createHmac("sha256", parameters.secretKey)
        .update(rawSignature)
        .digest("hex");
    parameters.signature = signature;
    //json object send to MoMo endpoint
    const requestBody = JSON.stringify(parameters);

    const options = {
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
        },
        data: requestBody,
    };

    try {
        const response = await axios(options);
        const resData: any = response.data;
        if (resData.resultCode === 0) {
            //create order with status PENDING
            const CREATE_ORDER_MUTATION = CreateOrderDocument
            const variables = {
                createOrderInput: {
                    _id: orderId,
                    customerClerkId: customer.clerkId,
                    totalAmount: customer.totalAmount,
                    customerName: customer.name,
                    address: customer.address,
                    email: customer.email,
                    phone: customer.phone,
                    products,
                    status: "PENDING"
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
                        headers: corsHeaders
                    });
                }
                if (errors) {
                    return NextResponse.json(errors[0].message, {
                        status: 500,
                        headers: corsHeaders
                    });
                }
            } catch (error) {
                console.error("Error during mutation:", error);
                return new NextResponse("Error during create order", { status: 500, headers: corsHeaders });
            }
        }
        return NextResponse.json(resData, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error("[checkout_POST]", error);
        return NextResponse.json(
            { message: "Payment creation failed" },
            { status: 500, headers: corsHeaders }
        );
    }
};
