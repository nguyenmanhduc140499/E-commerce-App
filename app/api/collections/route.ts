import {
  CreateCollectionDocument,
  GetCollectionDocument,
  GetListCollectionDocument,
} from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

//create collection
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    const { title, description, image, banner } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const GET_COLLECTION_QUERY = GetCollectionDocument;
    const variables = {
      GetCollectionInput: { title: title },
    };
    try {
      const { data } = await client.query({
        query: GET_COLLECTION_QUERY,
        variables,
      });
      if (data.getCollection.collection) {
        return new NextResponse("Collection already exists", { status: 400 });
      }
    } catch (error) {
      console.error("Error during query:", error);
      return new NextResponse("Error during deletion", { status: 500 });
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }
    try {
      const CREATE_COLLECTION_QUERY = CreateCollectionDocument;
      const { data, errors } = await client.mutate({
        mutation: CREATE_COLLECTION_QUERY,
        variables: {
          CreateCollectionInput: { title, description, image, banner },
        },
      });

      if (!data.createCollection.success) {
        return NextResponse.json(data.createCollection.message, {
          status: data.createCollection.code,
        });
      }

      if (errors) {
        return NextResponse.json(errors[0].message, {
          status: 500,
        });
      }

      return NextResponse.json(data.createCollection.collection, {
        status: 200,
      });

    } catch (error) {
      console.error("Error during mutation:", error);
      return new NextResponse("Error during deletion", { status: 500 });
    }
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

//get list collection
export const GET = async () => {
  try {
    const GET_COLLECTIONS_QUERY = GetListCollectionDocument;
    const { data } = await client.query({
      query: GET_COLLECTIONS_QUERY,
      fetchPolicy: "network-only",
    });
    return NextResponse.json(data.getListCollection.listCollection, {
      status: 200,
      headers: corsHeaders
    });
  } catch (err) {
    console.log("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500, headers: corsHeaders });
  }
};

export const dynamic = "force-dynamic";
