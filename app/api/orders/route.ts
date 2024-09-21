import { GetListOrderDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const GET_ORDERS_QUERY = GetListOrderDocument;
    const { data } = await client.query({
      query: GET_ORDERS_QUERY,
    });
    return NextResponse.json(data.getListOrder.listOrder, { status: 200 });
  } catch (err) {
    console.log("[Orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
