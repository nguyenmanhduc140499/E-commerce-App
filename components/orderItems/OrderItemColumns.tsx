"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<PopulateOrderItemType>[] = [
  {
    accessorKey: "productTitle",
    header: "Product",
    cell: ({ row }) => {
      return (
        <Link
          href={`/products/${row.original.productId}`}
          className="hover:text-red-1"
        >
          {row.original.productTitle}
        </Link>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.productMedia[0]}
        width={360}
        height={360}
        alt="product"
        className="w-[90px] h-[90px] object-cover rounded-xl"
      />
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.original.productStatus,
  },
];
