import { GetListOrderDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const GET_ORDERS_QUERY = GetListOrderDocument;
    const { data, errors } = await client.query({
      query: GET_ORDERS_QUERY,
    });
    if (!data.getListOrder.success) {
      return new NextResponse(data.getListOrder.message, {
        status: data.getListOrder.code,
      });
    }

    if (errors) {
      return NextResponse.json(errors[0].message, {
        status: 500,
      });
    }
    return NextResponse.json(data.getListOrder.listOrder, {
      status: 200,
    });
  } catch (err) {
    console.log("[Orders_GET]", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";

