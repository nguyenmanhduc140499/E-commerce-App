"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface RemoveProps {
  item: string;
  collectionId: string;
  productId: string;
}
const Remove: React.FC<RemoveProps> = ({ item, collectionId, productId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const onRemove = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/${item}/${collectionId}`, {
        method: "PUT",
        body: JSON.stringify(productId),
      });

      if (!res.ok) {
        setLoading(false);
        const errorMessage = await res.text();
        toast.error(errorMessage);
        return;
      }

      if (res.ok) {
        setLoading(false);
        toast.success(`Removed product is success`);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-1 text-white">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently Remove your{" "}
            {item}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onRemove}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Remove;
