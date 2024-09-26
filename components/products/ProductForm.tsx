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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  status: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductProps {
  initialData?: ProductType | null;
}
const ProductForm: React.FC<ProductProps> = ({ initialData }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true); //true to fetch data
  const router = useRouter();
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_productForm_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          status: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
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

  const activeProduct = async ({ _id }: { _id: string }) => {
    try {
      const res = await fetch(`/api/products/${_id}`, {
        method: "PUT",
      });
      if (res.ok) {
        window.location.reload();
        setLoading(false);
      }
    } catch (error) {
      console.log("[active_product_PUT]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
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
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (error) {
      console.log("[Product_POST]", error);
      toast.error("Something went wrong!. Please try again.");
    }
  };

  return loading ? (
    <Loader /> //important: have to load data done before showing
  ) : (
    <div
      style={{
        pointerEvents: initialData?.status === "DISCONTINUED" ? "none" : "auto", // Vô hiệu hóa tất cả các sự kiện tương tác
        opacity: initialData?.status === "DISCONTINUED" ? 0.5 : 1, // Hiển thị dữ liệu với độ mờ thông thường (tuỳ chọn)
      }}
      className="p-10"
    >
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Product</p>
          {initialData.status === "INUSE" ? (
            <Delete id={initialData._id} item={"product"} />
          ) : (
            <button
              className="z-10 bg-red-1 text-white border rounded-lg py-2 px-2"
              style={{
                pointerEvents: "auto", // Cho phép sự kiện tương tác trên nút này
              }}
              onClick={() => activeProduct({ _id: initialData._id })}
            >
              Reuse product
            </button>
          )}
        </div>
      ) : (
        <p className="text-heading2-bold">Create Product</p>
      )}
      <Separator className="bg-grey-1 mt-4 mb-7" />

      {initialData?.status === "DISCONTINUED" && (
        <span className="bg-blue-1 text-white rounded-md py-2 px-2 border rounded-lg">
          Product is discontinued
        </span>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-7">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="flex flex-row">
                    Title<p className="text-red-1"> *</p>
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="flex flex-row">
                    Description<p className="text-red-1"> *</p>
                  </p>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <p className="flex flex-row">
                    Media<p className="text-red-1"> *</p>
                  </p>
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={url => {
                      const currentImages = form.getValues("media");
                      const updatedImages = [...currentImages, url];
                      form.setValue("media", updatedImages, {
                        shouldValidate: true,
                      });
                    }}
                    onRemove={url =>
                      field.onChange([
                        ...field.value.filter(image => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <div className="flex flex-row">
            <div className="md:grid md:grid-cols-2 gap-8 aline-item w-4/5 pr-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="flex flex-row">
                        Price (VND)<p className="text-red-1"> *</p>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="flex flex-row">
                        Expense (VND)<p className="text-red-1"> *</p>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Expense"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="flex flex-row">
                        Category<p className="text-red-1"> *</p>
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Tags"
                        value={field.value}
                        onChange={tag => field.onChange([...field.value, tag])}
                        onRemove={tagToRemove =>
                          field.onChange([
                            ...field.value.filter(tag => tag !== tagToRemove),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Colors"
                        value={field.value}
                        onChange={color =>
                          field.onChange([...field.value, color])
                        }
                        onRemove={colorToRemove =>
                          field.onChange([
                            ...field.value.filter(
                              color => color !== colorToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Sizes"
                        value={field.value}
                        onChange={size =>
                          field.onChange([...field.value, size])
                        }
                        onRemove={sizeToRemove =>
                          field.onChange([
                            ...field.value.filter(
                              size => size !== sizeToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            </div>

            {collections.length > 0 && (
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collections</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Collections"
                        collections={collections}
                        value={field.value}
                        onChange={_id => field.onChange([...field.value, _id])}
                        onRemove={idToRemove =>
                          field.onChange([
                            ...field.value.filter(
                              collectionId => collectionId !== idToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 rounded-md text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
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

export default ProductForm;
