"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { useGetCollectionTitleQuery } from "@/generated/graphql";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
      row.original.collections
        .map(collection => GetTitle(collection))
        .join(", "),
  },
  {
    accessorKey: "price",
    header: "Price (VND)",
  },
  {
    accessorKey: "expense",
    header: "Expense (VND)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];

export const GetTitle = (_id: string) => {
  const { data } = useGetCollectionTitleQuery({ variables: { _id } });
  return data?.getCollectionTitle;
};
