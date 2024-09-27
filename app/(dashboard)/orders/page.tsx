// "use client";

import { DataTable } from "@/components/custom ui/DataTable";
// import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";

// import { useEffect, useState } from "react";

const Orders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
    cache: "reload",
  });
  const orders = await res.json();
  // const [loading, setLoading] = useState(true);
  // const [orders, setOrders] = useState([]);

  // const getOrders = async () => {
  //   try {
  //     const res = await fetch("/api/orders", {
  //       method: "GET",
  //       cache: "reload",
  //     });
  //     const data = await res.json();
  //     setOrders(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("[orders_GET", err);
  //   }
  // };

  // useEffect(() => {
  //   getOrders();
  // }, []);

  // return loading ? (
  //   <Loader />
  // ) :
  return (
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

export const dynamic = "force-dynamic";

export default Orders;
