"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orderItems/OrderItemColumns";
import { formatCurrencyVND } from "@/lib/common";
import { useState, useEffect } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);
  const getOrderDetail = async () => {
    try {
      const res = await fetch(`/api/orders/${params.orderId}`, {
        method: "GET",
        cache: "reload",
      });
      if (res.ok) {
        const data = await res.json();
        setOrderDetail(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("collectionDetail_GET", error);
    }
  };
  useEffect(() => {
    getOrderDetail();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let refactorProductData: PopulateOrderItemType[] = [];
  if (orderDetail) {
    refactorProductData = orderDetail?.products.map(item => {
      return {
        productId: item.product._id,
        productStatus: item.product.status,
        productTitle: item.product.title,
        productMedia: item.product.media,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      };
    });
  }

  return loading ? (
    <Loader />
  ) : (
    <div>
      {orderDetail && (
        <div className="flex flex-col p-10 gap-5">
          <p className="text-base-bold">
            Order ID:{" "}
            <span className="text-base-medium">{orderDetail._id}</span>
          </p>
          <p className="text-base-bold">
            Customer name:{" "}
            <span className="text-base-medium">{orderDetail.customerName}</span>
          </p>
          <p className="text-base-bold">
            Shipping address:{" "}
            <span className="text-base-medium">{orderDetail.address}</span>
          </p>
          <p className="text-base-bold">
            Total Paid:{" "}
            <span className="text-base-medium">
              {formatCurrencyVND(orderDetail.totalAmount)}
            </span>
          </p>
          <p className="text-base-bold">
            Email: <span className="text-base-medium">{orderDetail.email}</span>
          </p>
          <p className="text-base-bold">
            Phone: <span className="text-base-medium">{orderDetail.phone}</span>
          </p>
          <div>
            <p className="font-light italic text-xs pt-5">
              You can search by product
            </p>
            <DataTable
              columns={columns}
              data={refactorProductData}
              searchKey="productTitle"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
