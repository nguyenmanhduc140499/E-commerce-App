"use client";

import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import Image from "next/image";
import { formatCurrencyVND } from "@/lib/common";

const activeProduct = async ({ _id }: { _id: string }) => {
  try {
    const res = await fetch(`/api/products/${_id}`, {
      method: "PUT",
    });
    if (res.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.log("[active_product_column_PUT]", error);
    toast.error("Something went wrong! Please try again.");
  }
};

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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.media[0]}
        width={360}
        height={360}
        alt="product"
        className="w-[90px] h-[90px] object-cover rounded-xl"
      />
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "price",
    header: "Price (VND)",
    cell: ({ row }) => formatCurrencyVND(row.original.price),
  },
  {
    accessorKey: "expense",
    header: "Expense (VND)",
    cell: ({ row }) => formatCurrencyVND(row.original.expense),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Active",
    id: "actions",
    cell: ({ row }) =>
      row.original.status === "INUSE" ? (
        <Delete item="product" id={row.original._id} />
      ) : (
        <button
          className="bg-red-1 text-white border rounded-lg py-2 px-2"
          style={{
            pointerEvents: "auto", // Cho phép sự kiện tương tác trên nút này
          }}
          onClick={() => activeProduct({ _id: row.original._id })}
        >
          Reuse
        </button>
      ),
  },
];
