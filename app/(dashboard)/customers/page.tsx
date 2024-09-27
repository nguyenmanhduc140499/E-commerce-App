// "use client";

import { DataTable } from "@/components/custom ui/DataTable";
// import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
// import { useState, useEffect } from "react";

const Customers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
    cache: "reload",
  });
  const customers = await res.json();
  // const [loading, setLoading] = useState(true);
  // const [customers, setCustomer] = useState([]);

  // const getOrders = async () => {
  //   try {
  //     const res = await fetch(`/api/customer`, {
  //       method: "GET",
  //       cache: "reload",
  //     });
  //     const data = await res.json();
  //     setCustomer(data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("[customers_GET", err);
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
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />
      <p className="font-light italic text-xs pt-5">
        You can search by customer name
      </p>
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
