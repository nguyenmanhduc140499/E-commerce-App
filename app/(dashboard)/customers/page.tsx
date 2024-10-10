"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const getCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/customer", {
        method: "GET",
        cache: "reload",
      });
      const data = await res.json();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong!. Please try again.");
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
