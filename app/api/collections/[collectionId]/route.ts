import {
    DeleteCollectionDocument,
    GetCollectionDocument,
    UpdateCollectionDocument,
    UpdateProductCollectionDocument,
} from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Collection details
export const GET = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
        const GET_COLLECTION_DETAIL_QUERY = GetCollectionDocument;
        const variables = {
            GetCollectionInput: { _id: params.collectionId },
        };

        try {
            const { data, errors } = await client.query({
                query: GET_COLLECTION_DETAIL_QUERY,
                variables,
            });
            if (!data.getCollection.collection) {
                return new NextResponse(
                    JSON.stringify({ message: "Collection not found" }),
                    { status: 400 }
                );
            }
            if (!data.getCollection.success) {
                return NextResponse.json(data.getCollection.message, {
                    status: data.getCollection.code,
                });
            }
            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }
            return NextResponse.json(data.getCollection.collection, { status: 200 });
        } catch (queryError) {
            console.error("Error during query:", queryError);
            return new NextResponse("Error during deletion", { status: 500 });
        }
    } catch (error) {
        console.log("[collectionDetail_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

//update Collection
export const POST = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
        const { userId } = auth();
        const { title, description, image, banner } = await req.json();
        const GET_COLLECTION_QUERY = GetCollectionDocument;
        const UPDATE_COLLECTION_MUTATION = UpdateCollectionDocument;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        //validate collection by Id
        try {
            const { data } = await client.query({
                query: GET_COLLECTION_QUERY,
                variables: {
                    GetCollectionInput: { _id: params.collectionId },
                },
            });
            if (!data.getCollection.collection) {
                return new NextResponse("Collection not found", { status: 400 });
            }
        } catch (queryError) {
            console.error("Error during query for update Collection:", queryError);
            return new NextResponse("Error during finding", { status: 500 });
        }

        //update collection by Id
        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 });
        }
        try {
            const { data, errors } = await client.mutate({
                mutation: UPDATE_COLLECTION_MUTATION,
                variables: {
                    UpdateCollectionInput: {
                        _id: params.collectionId,
                        title,
                        description,
                        image,
                        banner
                    },
                },
            });

            if (!data.updateCollection.success) {
                return NextResponse.json(data.updateCollection.message, {
                    status: data.updateCollection.code,
                });
            }
            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }

            return NextResponse.json(data.updateCollection.collection, {
                status: 200,
            });
        } catch (error) {
            console.error("Error during mutation:", error);
            return new NextResponse("Error during updating", { status: 500 });
        }
    } catch (error) {
        console.log("[collections_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

//delete Collection
export const DELETE = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const variables = {
            DeleteCollectionInput: { _id: params.collectionId },
        };
        const DELETE_COLLECTION_QUERY = DeleteCollectionDocument;
        try {
            await client.mutate({
                mutation: DELETE_COLLECTION_QUERY,
                variables,
            });
            return NextResponse.json({ message: "Delete collection successfully" }, { status: 200 });
        } catch (mutationError) {
            console.error("Error during mutation:", mutationError);
            return new NextResponse("Error during deletion", { status: 500 });
        }
    } catch (err) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const PUT = async (
    req: NextRequest,
    { params }: { params: { collectionId: string } }
) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const productId = await req.json();
        const UPDATE_COLLECTION_PRODUCT = UpdateProductCollectionDocument;
        const variables = {
            UpdateProductCollectionInput: {
                _id: params.collectionId,
                productId,
                status: "REMOVE",
            },
        };
        try {
            const { data, errors } = await client.mutate({
                mutation: UPDATE_COLLECTION_PRODUCT,
                variables,
            });

            if (!data.updateProductCollection.success) {
                return new NextResponse(data.updateProductCollection.message, {
                    status: data.updateProductCollection.code,
                });
            }
            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }

            return NextResponse.json(data.updateProductCollection.collection, {
                status: 200,
            });
        } catch (mutationError) {
            console.error("Error during update product:", mutationError);
            return new NextResponse("Error during update product", { status: 500 });
        }
    } catch (err) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic"; //update data realtime
