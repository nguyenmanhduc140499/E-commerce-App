import {
  CreateCollectionDocument,
  GetCollectionDocument,
  GetListCollectionDocument,
} from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

//create collection
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    const { title, description, image } = await req.json();
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
      const { data } = await client.mutate({
        mutation: CREATE_COLLECTION_QUERY,
        variables: { title: title, description: description, image: image },
      });
      return NextResponse.json(data.createCollection, { status: 200 });
    } catch (error) {
      console.error("Error during mutation:", error);
      return new NextResponse("Error during deletion", { status: 500 });
    }
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// export const createCollection = async (title: string, description: string, image: string) => {
//   try {
//     const { data } = await client.mutate({
//       mutation: CREATE_COLLECTION_QUERY,
//       variables: { title: title, description: description, image: image },
//     });
//     return data.createCollection
//   } catch (mutationError) {
//     console.error("Error during mutation:", mutationError);
//     return new NextResponse("Error during deletion", { status: 500 });
//   }
// }

//get list collection
export const GET = async () => {
  try {
    const GET_COLLECTIONS_QUERY = GetListCollectionDocument;
    const { data } = await client.query({
      query: GET_COLLECTIONS_QUERY,
    });
    return NextResponse.json(data.getListCollection.listCollection, {
      status: 200,
    });
  } catch (err) {
    console.log("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
