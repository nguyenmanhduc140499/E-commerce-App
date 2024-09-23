import {
  CreateProductDocument,
  GetListProductDocument,
} from "@/generated/graphql";
import client from "@/lib/apolloClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

//create product
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

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

    if (!title || !description || !media || !category || !price || !expense) {
      return NextResponse.json(
        { message: "Not enough data to create a product" },
        {
          status: 400,
        }
      );
    }

    //create Product
    const CREATE_PRODUCT_QUERY = CreateProductDocument;
    const variables = {
      createProductInput: {
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
    try {
      const { data, errors } = await client.mutate({
        mutation: CREATE_PRODUCT_QUERY,
        variables,
      });

      if (!data.createProduct.success) {
        return new NextResponse(data.createProduct.message, {
          status: data.createProduct.code,
        });
      }
      if (errors) {
        return NextResponse.json(errors[0].message, {
          status: 500,
        });
      }

      return NextResponse.json(data.createProduct, { status: 200 });
    } catch (mutationError) {
      console.error("Error during mutation products:", mutationError);
      return new NextResponse("Error during creating product", { status: 500 });
    }
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

//get list product
export const GET = async () => {
  try {
    const GET_PRODUCTS_QUERY = GetListProductDocument;
    const { data } = await client.query({
      query: GET_PRODUCTS_QUERY,
    });
    return NextResponse.json(data.getListProduct.listProduct, { status: 200 });
  } catch (err) {
    console.log("[Products_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
