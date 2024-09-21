import { GetRelatedProductDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        const GET_RELATED_PRODUCT = GetRelatedProductDocument
        const variables = { mainProductId: params.productId }

        const { data, errors } = await client.query({
            query: GET_RELATED_PRODUCT,
            variables
        })

        if (!data.getRelatedProduct.success) {
            return new NextResponse(data.getRelatedProduct.message, {
                status: data.getRelatedProduct.code,
            });
        }

        if (errors) {
            return NextResponse.json(errors[0].message, {
                status: 500,
            });
        }

        return NextResponse.json(data.getRelatedProduct.listProduct, { status: 200 })
    } catch (err) {
        console.log("[related_GET", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";