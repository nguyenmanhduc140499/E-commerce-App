"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import Image from "next/image";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        width={90}
        height={90}
        alt="product"
        className="w-[90px] h-[90px] object-cover rounded-xl"
      />
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => (
      <p>
        {row.original.products?.map(item => item.status === "INUSE").length}
      </p>
    ),
  },
  {
    header: "Action",
    id: "action",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];
