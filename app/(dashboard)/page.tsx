"use client";

import Loader from "@/components/custom ui/Loader";
import SalesChart from "@/components/custom ui/SaleChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrencyVND } from "@/lib/common";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
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
    getOrders();
    getCustomers();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc: number, order: OrderColumnType) => acc + order.totalAmount,
    0
  );
  const totalCustomers = customers.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const salesPerMonth = orders.reduce((acc: any, order: any) => {
    const cleanedDateString = order.createdAt.replace(
      /(\d+)(st|nd|rd|th)/,
      "$1"
    );
    const monthIndex = new Date(cleanedDateString).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    return acc;
  }, {});

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, i)
    );
    return { name: month, sales: salesPerMonth[i] || 0 };
  });

  return loading ? (
    <Loader />
  ) : (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{formatCurrencyVND(totalRevenue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Customer</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Sales Chart (VND)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Home;
