import { formatCurrencyVND } from "@/lib/common";
import Image from "next/image";
import Link from "next/link";
import Remove from "../custom ui/Remove";

interface ProductCardProps {
  product: ProductType;
  collectionId: string;
}

const AdminProductCard = ({ product, collectionId }: ProductCardProps) => {
  return (
    <div
      style={{
        pointerEvents: product.status === "DISCONTINUED" ? "none" : "auto",
        opacity: product.status === "DISCONTINUED" ? 0.5 : 1,
      }}
    >
      <div className="relative flex flex-col">
        {product.status === "INUSE" && (
          <div className="absolute top-0 right-0 z-10">
            <Remove
              collectionId={collectionId}
              productId={product._id}
              item={"collections"}
            />
          </div>
        )}
        <div>
          <Link
            href={`/products/${product._id}`}
            className="w-[120px] flex flex-col gap-2"
          >
            <Image
              src={product.media[0]}
              alt="product"
              width={120}
              height={120}
              className="h-[120px] rounded-lg object-cover"
            />

            <div>
              <p className="text-base-bold">{product.title}</p>
              <p className="text-small-medium text-grey-2">
                {product.category}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-body-bold">
                {formatCurrencyVND(product.price)}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
