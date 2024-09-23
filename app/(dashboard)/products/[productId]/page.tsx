"use client";

import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);
  const getProductDetail = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetail(data);
      setLoading(false);
    } catch (error) {
      console.log("collectionDetail_GET", error);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return loading ? <Loader /> : <ProductForm initialData={productDetail} />;
};

export default ProductDetails;
