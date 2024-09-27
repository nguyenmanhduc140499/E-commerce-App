import { GetListUserDocument } from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const GET_USERS_QUERY = GetListUserDocument;
        const { data, errors } = await client.query({
            query: GET_USERS_QUERY,
            fetchPolicy: "network-only"
        });

        if (!data.getListUser.success) {
            return new NextResponse(data.getListUser.message, {
                status: data.getListUser.code,
            });
        }
        if (errors) {
            return NextResponse.json(errors[0].message, {
                status: 500,
            });
        }

        return NextResponse.json(data.getListUser.listUser, { status: 200 });
    } catch (err) {
        console.log("[Orders_GET]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
export const dynamic = "force-dynamic";
