import {
    DeleteProductDocument,
    GetProductDetailDocument,
    UpdateProductDocument,
    ActiveProductDocument
} from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_ECOMMERCE_STORE_URL_PAGE}`,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

//detail Product
export const GET = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        const GET_PRODUCT_DETAIL_QUERY = GetProductDetailDocument;
        const variables = {
            getProductInput: { productId: params.productId },
        };

        try {
            const { data } = await client.query({
                query: GET_PRODUCT_DETAIL_QUERY,
                variables,
            });
            if (!data.getProductDetail.product) {
                return new NextResponse(
                    JSON.stringify({ message: "Product not found" }),
                    { status: 400, headers: corsHeaders }
                );
            }
            return NextResponse.json(data.getProductDetail.product, {
                status: 200,
                headers: corsHeaders,
            });
        } catch (queryError) {
            console.error("Error during query:", queryError);
            return new NextResponse("Error during query", {
                status: 500, headers: corsHeaders,
            });
        }
    } catch (error) {
        console.log("[productDetail_GET]", error);
        return new NextResponse("Internal Server Error", {
            status: 500, headers: corsHeaders,
        });
    }
};

//update Product
export const POST = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        const { userId } = auth();
        const {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense,
        } = await req.json();
        const UPDATE_PRODUCT_MUTATION = UpdateProductDocument;
        const variables = {
            UpdateProductInput: {
                _id: params.productId,
                title,
                description,
                media,
                category,
                collections,
                tags,
                sizes,
                colors,
                price,
                expense,
            },
        };
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        //update collection by Id
        if (!title || !description || !media || !category || !price || !expense) {
            return NextResponse.json(
                { message: "Not enough data to update a product" },
                {
                    status: 400,
                }
            );
        }

        try {
            const { data, errors } = await client.mutate({
                mutation: UPDATE_PRODUCT_MUTATION,
                variables,
            });

            if (!data.updateProduct.success) {
                return new NextResponse(data.updateProduct.message, {
                    status: data.updateProduct.code,
                });
            }
            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }
            return NextResponse.json(data.updateProduct.product, {
                status: 200,
            });
        } catch (error) {
            console.error("Error during mutation:", error);
            return new NextResponse("Error during updating", { status: 500 });
        }
    } catch (error) {
        console.log("[product_update_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

// delete product
export const DELETE = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const variables = {
            DeleteProductInput: { _id: params.productId },
        };
        const DELETE_PRODUCT_QUERY = DeleteProductDocument;
        try {
            const { data, errors } = await client.mutate({
                mutation: DELETE_PRODUCT_QUERY,
                variables,
            });

            if (!data.deleteProduct.success) {
                return new NextResponse(data.deleteProduct.message, {
                    status: data.deleteProduct.code,
                });
            }
            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }
            return NextResponse.json({ message: "Product deleted" }, { status: 200 })
        } catch (mutationError) {
            console.error("Error during mutation:", mutationError);
            return new NextResponse("Error during deletion", { status: 500 });
        }

    } catch (err) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

//Active product
export const PUT = async (
    req: NextRequest,
    { params }: { params: { productId: string } }
) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        const variables = {
            ActiveProductInput: { _id: params.productId },
        };
        const ACTIVE_PRODUCT_QUERY = ActiveProductDocument;
        try {
            const { data, errors } = await client.mutate({
                mutation: ACTIVE_PRODUCT_QUERY,
                variables,
            });

            if (!data.activeProduct.success) {
                return new NextResponse(data.activeProduct.message, {
                    status: data.activeProduct.code,
                });
            }

            if (errors) {
                return NextResponse.json(errors[0].message, {
                    status: 500,
                });
            }

            return NextResponse.json({ message: "Product actived" }, { status: 200 })
        } catch (mutationError) {
            console.error("Error during active product:", mutationError);
            return new NextResponse("Error during active product", { status: 500 });
        }

    } catch (err) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";
