import axios from "axios";
import moment from "moment";
import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
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

    if (req.method === "POST") {
        const key1 = process.env.ZALOPAY_KEY1;
        const transID = Math.floor(Math.random() * 1000000);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const order: any = {
            app_id: process.env.ZALOPAY_APP_ID,
            app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
            app_user: customer.clerkId,
            app_time: Date.now(),
            item: JSON.stringify(cartItems),
            amount: customer.totalAmount,
            description: `Nghien - Payment for the order #${transID}`,
            embed_data: JSON.stringify({
                redirecturl: `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL_PAGE}/payment_success`,
                customerName: customer.name,
                email: customer.email,
                address: customer.address,
                phone: customer.phone,
            }),
            bank_code: "",
            callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/zalopay/callback`,
            // callback_url: `https://e884-2405-4802-1ca4-ef90-7dc0-1673-e18a-bcf3.ngrok-free.app/api/zalopay/callback`, ngrok
        };
        // Create the signature using Key1
        const data =
            process.env.ZALOPAY_APP_ID +
            "|" +
            order.app_trans_id +
            "|" +
            order.app_user +
            "|" +
            order.amount +
            "|" +
            order.app_time +
            "|" +
            order.embed_data +
            "|" +
            order.item;
        order.mac = CryptoJS.HmacSHA256(data, key1 as string).toString();
        try {
            const response = await axios.post(
                process.env.ZALOPAY_ENDPOINT as string,
                null,
                { params: order, withCredentials: true }
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const resData: any = response.data
            resData.app_trans_id = response.config.params.app_trans_id
            return NextResponse.json(resData, {
                headers: corsHeaders,
                status: 200,
            });
        } catch (error) {
            console.error("[checkout_POST]", error);
            return NextResponse.json(
                { message: "Payment creation failed" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { message: "Method Not Allowed" },
            { status: 405 }
        );
    }
};
