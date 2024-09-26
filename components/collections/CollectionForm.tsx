"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; //use shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import Loader from "../custom ui/Loader";
import AdminProductCard from "../products/AdminProductCart";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
  products: z
    .array(
      z.object({
        title: z.string().min(2).max(50),
        description: z.string().min(2).max(500).trim(),
        media: z.array(z.string()),
        category: z.string(),
        collections: z.array(z.string()),
        tags: z.array(z.string()),
        sizes: z.array(z.string()),
        status: z.string(),
        colors: z.array(z.string()),
        price: z.coerce.number().min(0.1),
        expense: z.coerce.number().min(0.1),
      })
    )
    .optional(),
});

interface CollectionProps {
  initialData?: CollectionType | null;
}
const CollectionForm: React.FC<CollectionProps> = ({ initialData }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        setLoading(false);
        // If status is not OK, show an error toast
        const errorMessage = await res.text(); // Assuming the server returns the error message as plain text
        toast.error(errorMessage);
        return;
      }

      if (res.ok) {
        setLoading(false);
        toast.success(`Collection ${initialData ? "updated" : "created"}`);
        window.location.href = "/collections";
        router.push("/collections");
      }
    } catch (error) {
      console.log("[Collection_POST]", error);
      toast.error("Something went wrong!. Please try again.");
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete id={initialData._id} item={"collection"} />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Collection</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={url => {
                      field.onChange(url);
                    }}
                    onRemove={() => {
                      field.onChange("");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {initialData && initialData.products.length && (
            <div className="flex flex-col gap-6">
              <FormLabel>Products</FormLabel>
              <div className="flex flex-wrap gap-16">
                {initialData.products.map((product: ProductType) => (
                  <AdminProductCard
                    key={product._id}
                    product={product}
                    collectionId={initialData._id}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 rounded-md text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/collections")}
              className="bg-blue-1 rounded-md text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
