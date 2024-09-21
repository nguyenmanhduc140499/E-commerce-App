"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { useEffect, useState } from "react";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetail, setCollectionDetail] =
    useState<CollectionType | null>(null);
  const getCollectionDetail = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
        cache: "reload",
      });
      const data = await res.json();
      setCollectionDetail(data);
      setLoading(false);
    } catch (error) {
      console.log("collectionDetail_GET", error);
    }
  };
  useEffect(() => {
    getCollectionDetail();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetail} />
  );
};

export default CollectionDetails;
