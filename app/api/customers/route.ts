import { GetListUserDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const GET_USERS_QUERY = GetListUserDocument;
        const { data } = await client.query({
            query: GET_USERS_QUERY,
        });
        return NextResponse.json(data.getListUser.listUser, { status: 200 });
    } catch (err) {
        console.log("[Orders_GET]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
export const dynamic = "force-dynamic";
