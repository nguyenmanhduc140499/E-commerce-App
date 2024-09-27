import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";

const Customers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
    cache: "no-store",
  });
  const customers = await res.json();

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
