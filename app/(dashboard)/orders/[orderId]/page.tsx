import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemColumns";
import { formatCurrencyVND } from "@/lib/common";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`,
    {
      method: "GET",
      cache: "reload",
    }
  );
  const data = await res.json();
  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{data._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name:{" "}
        <span className="text-base-medium">{data.customerName}</span>
      </p>
      <p className="text-base-bold">
        Shipping address:{" "}
        <span className="text-base-medium">{data.address}</span>
      </p>
      <p className="text-base-bold">
        Total Paid:{" "}
        <span className="text-base-medium">
          {formatCurrencyVND(data.totalAmount)}
        </span>
      </p>
      <p className="text-base-bold">
        Email: <span className="text-base-medium">{data.email}</span>
      </p>
      <p className="text-base-bold">
        Phone: <span className="text-base-medium">{data.phone}</span>
      </p>
      <DataTable columns={columns} data={data.products} searchKey="product" />
    </div>
  );
};

export default OrderDetails;
