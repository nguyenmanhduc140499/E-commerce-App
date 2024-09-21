import { SearchProductDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { query: string } }) => {
    try {

        const SEARCH_PRODUCT_QUERY = SearchProductDocument
        const variables = { productQuery: params.query }

        const { data } = await client.query({
            query: SEARCH_PRODUCT_QUERY,
            variables
        });

        return NextResponse.json(data.searchProduct.listProduct, { status: 200 })
    } catch (err) {
        console.log("[search_GET]", err)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";