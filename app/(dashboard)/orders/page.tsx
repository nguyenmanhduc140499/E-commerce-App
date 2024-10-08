"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        method: "GET",
        cache: "reload",
      });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong!. Please try again.");
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <p className="font-light italic text-xs pt-5">
        You can search by customer name
      </p>
      <DataTable columns={columns} data={orders} searchKey="customer" />
    </div>
  );
};

export default Orders;
