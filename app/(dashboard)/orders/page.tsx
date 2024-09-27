import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";

const Orders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
    cache: "no-store",
  });
  const orders = await res.json();

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
