import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
};

export type AllCollectionResponse = {
  __typename?: "AllCollectionResponse";
  code: Scalars["Float"]["output"];
  listCollection?: Maybe<Array<Collection>>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type AllOrderResponse = {
  __typename?: "AllOrderResponse";
  code: Scalars["Float"]["output"];
  listOrder?: Maybe<Array<ListOrderData>>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type AllProductResponse = {
  __typename?: "AllProductResponse";
  code: Scalars["Float"]["output"];
  listProduct?: Maybe<Array<Product>>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type AllUserResponse = {
  __typename?: "AllUserResponse";
  code: Scalars["Float"]["output"];
  listUser?: Maybe<Array<User>>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Collection = {
  __typename?: "Collection";
  _id: Scalars["ID"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  image: Scalars["String"]["output"];
  products?: Maybe<Array<Product>>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CollectionResponse = {
  __typename?: "CollectionResponse";
  code: Scalars["Float"]["output"];
  collection?: Maybe<Collection>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type CreateCollectionInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  image: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateOrderInput = {
  address: Scalars["String"]["input"];
  customerClerkId: Scalars["String"]["input"];
  customerName: Scalars["String"]["input"];
  email?: InputMaybe<Scalars["String"]["input"]>;
  phone: Scalars["String"]["input"];
  products: Array<OrderItemTypeInput>;
  totalAmount: Scalars["Float"]["input"];
};

export type CreateProductInput = {
  category: Scalars["String"]["input"];
  collections?: InputMaybe<Array<Scalars["String"]["input"]>>;
  colors?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description: Scalars["String"]["input"];
  expense: Scalars["Float"]["input"];
  media: Array<Scalars["String"]["input"]>;
  price: Scalars["Float"]["input"];
  sizes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
};

export type CreateUserInput = {
  clerkId: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type DeleteCollectionInput = {
  _id: Scalars["String"]["input"];
};

export type DeleteProductInput = {
  _id: Scalars["String"]["input"];
};

export type DetailsOrderInput = {
  orderId: Scalars["String"]["input"];
};

export type GetCollectionInput = {
  _id?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type GetProductInput = {
  productId: Scalars["String"]["input"];
};

export type GetUserInput = {
  clerkId: Scalars["String"]["input"];
};

export type IResponse = {
  __typename?: "IResponse";
  code: Scalars["Float"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type ListOrderData = {
  __typename?: "ListOrderData";
  _id: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  customer: Scalars["String"]["output"];
  products: Scalars["Float"]["output"];
  totalAmount: Scalars["Float"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createCollection: Collection;
  createOrder: OrderResponse;
  createProduct: ProductResponse;
  createUser: UserResponse;
  deleteCollection: IResponse;
  deleteProduct: IResponse;
  updateCollection: CollectionResponse;
  updateProduct: ProductResponse;
  userWishlist: UserResponse;
};

export type MutationCreateCollectionArgs = {
  CreateCollectionInput: CreateCollectionInput;
};

export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};

export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationDeleteCollectionArgs = {
  DeleteCollectionInput: DeleteCollectionInput;
};

export type MutationDeleteProductArgs = {
  DeleteProductInput: DeleteProductInput;
};

export type MutationUpdateCollectionArgs = {
  UpdateCollectionInput: UpdateCollectionInput;
};

export type MutationUpdateProductArgs = {
  UpdateProductInput: UpdateProductInput;
};

export type MutationUserWishlistArgs = {
  userWishlistInput: UserWishlistInput;
};

export type Order = {
  __typename?: "Order";
  _id: Scalars["ID"]["output"];
  address: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  customerClerkId: Scalars["String"]["output"];
  customerName: Scalars["String"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  phone: Scalars["String"]["output"];
  products: Array<OrderItemType>;
  totalAmount: Scalars["Float"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type OrderByCustomer = {
  __typename?: "OrderByCustomer";
  code: Scalars["Float"]["output"];
  listOrder?: Maybe<Array<Order>>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type OrderItemType = {
  __typename?: "OrderItemType";
  color: Scalars["String"]["output"];
  product: Product;
  quantity: Scalars["Float"]["output"];
  size: Scalars["String"]["output"];
};

export type OrderItemTypeInput = {
  color: Scalars["String"]["input"];
  productId: Scalars["String"]["input"];
  quantity: Scalars["Float"]["input"];
  size: Scalars["String"]["input"];
};

export type OrderResponse = {
  __typename?: "OrderResponse";
  code: Scalars["Float"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  order?: Maybe<Order>;
  success: Scalars["Boolean"]["output"];
};

export type Product = {
  __typename?: "Product";
  _id: Scalars["ID"]["output"];
  category: Scalars["String"]["output"];
  collections?: Maybe<Array<Scalars["String"]["output"]>>;
  colors?: Maybe<Array<Scalars["String"]["output"]>>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description: Scalars["String"]["output"];
  expense: Scalars["Float"]["output"];
  media: Array<Scalars["String"]["output"]>;
  price: Scalars["Float"]["output"];
  sizes?: Maybe<Array<Scalars["String"]["output"]>>;
  tags?: Maybe<Array<Scalars["String"]["output"]>>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ProductResponse = {
  __typename?: "ProductResponse";
  code: Scalars["Float"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  product?: Maybe<Product>;
  success: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  getCollection?: Maybe<CollectionResponse>;
  getCollectionTitle?: Maybe<Scalars["String"]["output"]>;
  getListCollection?: Maybe<AllCollectionResponse>;
  getListOrder?: Maybe<AllOrderResponse>;
  getListProduct?: Maybe<AllProductResponse>;
  getListUser: AllUserResponse;
  getOrderByCustomer?: Maybe<OrderByCustomer>;
  getOrderDetails: OrderResponse;
  getProductDetail: ProductResponse;
  getRelatedProduct?: Maybe<AllProductResponse>;
  getUserDetail: UserResponse;
  searchProduct?: Maybe<AllProductResponse>;
};

export type QueryGetCollectionArgs = {
  GetCollectionInput: GetCollectionInput;
};

export type QueryGetCollectionTitleArgs = {
  _id: Scalars["String"]["input"];
};

export type QueryGetOrderByCustomerArgs = {
  customerClerkId: Scalars["String"]["input"];
};

export type QueryGetOrderDetailsArgs = {
  detailsOrderInput: DetailsOrderInput;
};

export type QueryGetProductDetailArgs = {
  getProductInput: GetProductInput;
};

export type QueryGetRelatedProductArgs = {
  mainProductId: Scalars["String"]["input"];
};

export type QueryGetUserDetailArgs = {
  getUserInput: GetUserInput;
};

export type QuerySearchProductArgs = {
  productQuery: Scalars["String"]["input"];
};

export type UpdateCollectionInput = {
  _id?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  image: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type UpdateProductInput = {
  _id: Scalars["String"]["input"];
  category: Scalars["String"]["input"];
  collections?: InputMaybe<Array<Scalars["String"]["input"]>>;
  colors?: InputMaybe<Array<Scalars["String"]["input"]>>;
  description: Scalars["String"]["input"];
  expense: Scalars["Float"]["input"];
  media: Array<Scalars["String"]["input"]>;
  price: Scalars["Float"]["input"];
  sizes?: InputMaybe<Array<Scalars["String"]["input"]>>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title: Scalars["String"]["input"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"]["output"];
  clerkId: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  wishlist?: Maybe<Array<Scalars["String"]["output"]>>;
};

export type UserResponse = {
  __typename?: "UserResponse";
  code: Scalars["Float"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
  user?: Maybe<User>;
};

export type UserWishlistInput = {
  clerkId: Scalars["String"]["input"];
  wishlistProductId: Scalars["String"]["input"];
};

export type CreateCollectionMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  image: Scalars["String"]["input"];
}>;

export type CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection: {
    __typename?: "Collection";
    _id: string;
    title: string;
    description?: string | null;
    image: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    products?: Array<{
      __typename?: "Product";
      _id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      expense: number;
      media: Array<string>;
      collections?: Array<string> | null;
      tags?: Array<string> | null;
      sizes?: Array<string> | null;
      colors?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    }> | null;
  };
};

export type CreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput;
}>;

export type CreateOrderMutation = {
  __typename?: "Mutation";
  createOrder: {
    __typename?: "OrderResponse";
    code: number;
    success: boolean;
    message?: string | null;
    order?: {
      __typename?: "Order";
      _id: string;
      customerClerkId: string;
      totalAmount: number;
      address: string;
      phone: string;
      email?: string | null;
      customerName: string;
      createdAt?: Date | null;
      updatedAt?: Date | null;
      products: Array<{
        __typename?: "OrderItemType";
        color: string;
        size: string;
        quantity: number;
        product: {
          __typename?: "Product";
          _id: string;
          title: string;
          description: string;
          category: string;
          price: number;
          expense: number;
          media: Array<string>;
          collections?: Array<string> | null;
          tags?: Array<string> | null;
          sizes?: Array<string> | null;
          colors?: Array<string> | null;
          createdAt?: Date | null;
          updatedAt?: Date | null;
        };
      }>;
    } | null;
  };
};

export type CreateProductMutationVariables = Exact<{
  createProductInput: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: "Mutation";
  createProduct: {
    __typename?: "ProductResponse";
    code: number;
    success: boolean;
    message?: string | null;
    product?: {
      __typename?: "Product";
      _id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      expense: number;
      media: Array<string>;
      collections?: Array<string> | null;
      tags?: Array<string> | null;
      sizes?: Array<string> | null;
      colors?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    } | null;
  };
};

export type DeleteCollectionMutationVariables = Exact<{
  DeleteCollectionInput: DeleteCollectionInput;
}>;

export type DeleteCollectionMutation = {
  __typename?: "Mutation";
  deleteCollection: {
    __typename?: "IResponse";
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type DeleteProductMutationVariables = Exact<{
  DeleteProductInput: DeleteProductInput;
}>;

export type DeleteProductMutation = {
  __typename?: "Mutation";
  deleteProduct: {
    __typename?: "IResponse";
    code: number;
    success: boolean;
    message?: string | null;
  };
};

export type UpdateCollectionMutationVariables = Exact<{
  UpdateCollectionInput: UpdateCollectionInput;
}>;

export type UpdateCollectionMutation = {
  __typename?: "Mutation";
  updateCollection: {
    __typename?: "CollectionResponse";
    code: number;
    success: boolean;
    message?: string | null;
    collection?: {
      __typename?: "Collection";
      _id: string;
      title: string;
      description?: string | null;
      image: string;
      createdAt?: Date | null;
      updatedAt?: Date | null;
      products?: Array<{
        __typename?: "Product";
        _id: string;
        title: string;
        description: string;
        category: string;
        price: number;
        expense: number;
        media: Array<string>;
        collections?: Array<string> | null;
        tags?: Array<string> | null;
        sizes?: Array<string> | null;
        colors?: Array<string> | null;
        createdAt?: Date | null;
        updatedAt?: Date | null;
      }> | null;
    } | null;
  };
};

export type UpdateProductMutationVariables = Exact<{
  UpdateProductInput: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: "Mutation";
  updateProduct: {
    __typename?: "ProductResponse";
    code: number;
    success: boolean;
    message?: string | null;
    product?: {
      __typename?: "Product";
      _id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      expense: number;
      media: Array<string>;
      collections?: Array<string> | null;
      tags?: Array<string> | null;
      sizes?: Array<string> | null;
      colors?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    } | null;
  };
};

export type GetListCollectionQueryVariables = Exact<{ [key: string]: never }>;

export type GetListCollectionQuery = {
  __typename?: "Query";
  getListCollection?: {
    __typename?: "AllCollectionResponse";
    code: number;
    success: boolean;
    message?: string | null;
    listCollection?: Array<{
      __typename?: "Collection";
      _id: string;
      title: string;
      description?: string | null;
      image: string;
      createdAt?: Date | null;
      updatedAt?: Date | null;
      products?: Array<{
        __typename?: "Product";
        _id: string;
        title: string;
        description: string;
        category: string;
        price: number;
        expense: number;
        media: Array<string>;
        collections?: Array<string> | null;
        tags?: Array<string> | null;
        sizes?: Array<string> | null;
        colors?: Array<string> | null;
        createdAt?: Date | null;
        updatedAt?: Date | null;
      }> | null;
    }> | null;
  } | null;
};

export type GetCollectionQueryVariables = Exact<{
  GetCollectionInput: GetCollectionInput;
}>;

export type GetCollectionQuery = {
  __typename?: "Query";
  getCollection?: {
    __typename?: "CollectionResponse";
    code: number;
    success: boolean;
    message?: string | null;
    collection?: {
      __typename?: "Collection";
      _id: string;
      title: string;
      description?: string | null;
      image: string;
      createdAt?: Date | null;
      updatedAt?: Date | null;
      products?: Array<{
        __typename?: "Product";
        _id: string;
        title: string;
        description: string;
        category: string;
        price: number;
        expense: number;
        media: Array<string>;
        collections?: Array<string> | null;
        tags?: Array<string> | null;
        sizes?: Array<string> | null;
        colors?: Array<string> | null;
        createdAt?: Date | null;
        updatedAt?: Date | null;
      }> | null;
    } | null;
  } | null;
};

export type GetCollectionTitleQueryVariables = Exact<{
  _id: Scalars["String"]["input"];
}>;

export type GetCollectionTitleQuery = {
  __typename?: "Query";
  getCollectionTitle?: string | null;
};

export type GetListOrderQueryVariables = Exact<{ [key: string]: never }>;

export type GetListOrderQuery = {
  __typename?: "Query";
  getListOrder?: {
    __typename?: "AllOrderResponse";
    code: number;
    success: boolean;
    message?: string | null;
    listOrder?: Array<{
      __typename?: "ListOrderData";
      _id: string;
      customer: string;
      products: number;
      totalAmount: number;
      createdAt: string;
    }> | null;
  } | null;
};

export type GetOrderDetailQueryVariables = Exact<{
  detailsOrderInput: DetailsOrderInput;
}>;

export type GetOrderDetailQuery = {
  __typename?: "Query";
  getOrderDetails: {
    __typename?: "OrderResponse";
    code: number;
    success: boolean;
    message?: string | null;
    order?: {
      __typename?: "Order";
      _id: string;
      customerClerkId: string;
      customerName: string;
      address: string;
      phone: string;
      totalAmount: number;
      email?: string | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
      products: Array<{
        __typename?: "OrderItemType";
        color: string;
        size: string;
        quantity: number;
        product: {
          __typename?: "Product";
          _id: string;
          title: string;
          description: string;
          category: string;
          price: number;
          expense: number;
          media: Array<string>;
          collections?: Array<string> | null;
          tags?: Array<string> | null;
          sizes?: Array<string> | null;
          colors?: Array<string> | null;
          createdAt?: Date | null;
          updatedAt?: Date | null;
        };
      }>;
    } | null;
  };
};

export type GetOrderByCustomerQueryVariables = Exact<{
  customerClerkId: Scalars["String"]["input"];
}>;

export type GetOrderByCustomerQuery = {
  __typename?: "Query";
  getOrderByCustomer?: {
    __typename?: "OrderByCustomer";
    code: number;
    success: boolean;
    message?: string | null;
    listOrder?: Array<{
      __typename?: "Order";
      _id: string;
      customerClerkId: string;
      customerName: string;
      address: string;
      phone: string;
      totalAmount: number;
      email?: string | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
      products: Array<{
        __typename?: "OrderItemType";
        color: string;
        size: string;
        quantity: number;
        product: {
          __typename?: "Product";
          _id: string;
          title: string;
          description: string;
          category: string;
          price: number;
          expense: number;
          media: Array<string>;
          collections?: Array<string> | null;
          tags?: Array<string> | null;
          sizes?: Array<string> | null;
          colors?: Array<string> | null;
          createdAt?: Date | null;
          updatedAt?: Date | null;
        };
      }>;
    }> | null;
  } | null;
};

export type GetListProductQueryVariables = Exact<{ [key: string]: never }>;

export type GetListProductQuery = {
  __typename?: "Query";
  getListProduct?: {
    __typename?: "AllProductResponse";
    code: number;
    success: boolean;
    message?: string | null;
    listProduct?: Array<{
      __typename?: "Product";
      _id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      expense: number;
      media: Array<string>;
      collections?: Array<string> | null;
      tags?: Array<string> | null;
      sizes?: Array<string> | null;
      colors?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    }> | null;
  } | null;
};

export type GetProductDetailQueryVariables = Exact<{
  getProductInput: GetProductInput;
}>;

export type GetProductDetailQuery = {
  __typename?: "Query";
  getProductDetail: {
    __typename?: "ProductResponse";
    code: number;
    success: boolean;
    message?: string | null;
    product?: {
      __typename?: "Product";
      _id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      expense: number;
      media: Array<string>;
      colors?: Array<string> | null;
      collections?: Array<string> | null;
      tags?: Array<string> | null;
      sizes?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    } | null;
  };
};

export type SearchProductQueryVariables = Exact<{
  productQuery: Scalars["String"]["input"];
}>;

export type SearchProductQuery = {
  __typename?: "Query";
  searchProduct?: {
    __typename?: "AllProductResponse";
    code: number;
    success: boolean;
    message?: string | null;
    listProduct?: Array<{
      __typename?: "Product";
      _id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      expense: number;
      media: Array<string>;
      collections?: Array<string> | null;
      tags?: Array<string> | null;
      sizes?: Array<string> | null;
      colors?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    }> | null;
  } | null;
};

export type GetRelatedProductQueryVariables = Exact<{
  mainProductId: Scalars["String"]["input"];
}>;

export type GetRelatedProductQuery = {
  __typename?: "Query";
  getRelatedProduct?: {
    __typename?: "AllProductResponse";
    code: number;
    success: boolean;
    message?: string | null;
    listProduct?: Array<{
      __typename?: "Product";
      _id: string;
      title: string;
      description: string;
      category: string;
      price: number;
      expense: number;
      media: Array<string>;
      collections?: Array<string> | null;
      tags?: Array<string> | null;
      sizes?: Array<string> | null;
      colors?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    }> | null;
  } | null;
};

export type GetListUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetListUserQuery = {
  __typename?: "Query";
  getListUser: {
    __typename?: "AllUserResponse";
    code: number;
    success: boolean;
    message?: string | null;
    listUser?: Array<{
      __typename?: "User";
      _id: string;
      clerkId: string;
      email: string;
      name: string;
      wishlist?: Array<string> | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    }> | null;
  };
};

export const CreateCollectionDocument = gql`
  mutation CreateCollection(
    $title: String!
    $description: String
    $image: String!
  ) {
    createCollection(
      CreateCollectionInput: {
        title: $title
        description: $description
        image: $image
      }
    ) {
      _id
      title
      description
      image
      createdAt
      updatedAt
      products {
        _id
        title
        description
        category
        price
        expense
        media
        collections
        tags
        sizes
        colors
        createdAt
        updatedAt
      }
    }
  }
`;
export type CreateCollectionMutationFn = Apollo.MutationFunction<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>;

/**
 * __useCreateCollectionMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutation, { data, loading, error }] = useCreateCollectionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >(CreateCollectionDocument, options);
}
export type CreateCollectionMutationHookResult = ReturnType<
  typeof useCreateCollectionMutation
>;
export type CreateCollectionMutationResult =
  Apollo.MutationResult<CreateCollectionMutation>;
export type CreateCollectionMutationOptions = Apollo.BaseMutationOptions<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>;
export const CreateOrderDocument = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      code
      success
      message
      order {
        _id
        customerClerkId
        totalAmount
        address
        phone
        email
        customerName
        products {
          product {
            _id
            title
            description
            category
            price
            expense
            media
            collections
            tags
            sizes
            colors
            createdAt
            updatedAt
          }
          color
          size
          quantity
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export type CreateOrderMutationFn = Apollo.MutationFunction<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      createOrderInput: // value for 'createOrderInput'
 *   },
 * });
 */
export function useCreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
    CreateOrderDocument,
    options
  );
}
export type CreateOrderMutationHookResult = ReturnType<
  typeof useCreateOrderMutation
>;
export type CreateOrderMutationResult =
  Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      code
      success
      message
      product {
        _id
        title
        description
        category
        price
        expense
        media
        collections
        tags
        sizes
        colors
        createdAt
        updatedAt
      }
    }
  }
`;
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      createProductInput: // value for 'createProductInput'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const DeleteCollectionDocument = gql`
  mutation DeleteCollection($DeleteCollectionInput: DeleteCollectionInput!) {
    deleteCollection(DeleteCollectionInput: $DeleteCollectionInput) {
      code
      success
      message
    }
  }
`;
export type DeleteCollectionMutationFn = Apollo.MutationFunction<
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables
>;

/**
 * __useDeleteCollectionMutation__
 *
 * To run a mutation, you first call `useDeleteCollectionMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useDeleteCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCollectionMutation, { data, loading, error }] = useDeleteCollectionMutation({
 *   variables: {
 *      DeleteCollectionInput: // value for 'DeleteCollectionInput'
 *   },
 * });
 */
export function useDeleteCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >(DeleteCollectionDocument, options);
}
export type DeleteCollectionMutationHookResult = ReturnType<
  typeof useDeleteCollectionMutation
>;
export type DeleteCollectionMutationResult =
  Apollo.MutationResult<DeleteCollectionMutation>;
export type DeleteCollectionMutationOptions = Apollo.BaseMutationOptions<
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables
>;
export const DeleteProductDocument = gql`
  mutation DeleteProduct($DeleteProductInput: DeleteProductInput!) {
    deleteProduct(DeleteProductInput: $DeleteProductInput) {
      code
      success
      message
    }
  }
`;
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      DeleteProductInput: // value for 'DeleteProductInput'
 *   },
 * });
 */
export function useDeleteProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
  typeof useDeleteProductMutation
>;
export type DeleteProductMutationResult =
  Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>;
export const UpdateCollectionDocument = gql`
  mutation UpdateCollection($UpdateCollectionInput: UpdateCollectionInput!) {
    updateCollection(UpdateCollectionInput: $UpdateCollectionInput) {
      code
      success
      message
      collection {
        _id
        title
        description
        image
        createdAt
        updatedAt
        products {
          _id
          title
          description
          category
          price
          expense
          media
          collections
          tags
          sizes
          colors
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export type UpdateCollectionMutationFn = Apollo.MutationFunction<
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables
>;

/**
 * __useUpdateCollectionMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useUpdateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionMutation, { data, loading, error }] = useUpdateCollectionMutation({
 *   variables: {
 *      UpdateCollectionInput: // value for 'UpdateCollectionInput'
 *   },
 * });
 */
export function useUpdateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionMutation,
    UpdateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCollectionMutation,
    UpdateCollectionMutationVariables
  >(UpdateCollectionDocument, options);
}
export type UpdateCollectionMutationHookResult = ReturnType<
  typeof useUpdateCollectionMutation
>;
export type UpdateCollectionMutationResult =
  Apollo.MutationResult<UpdateCollectionMutation>;
export type UpdateCollectionMutationOptions = Apollo.BaseMutationOptions<
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables
>;
export const UpdateProductDocument = gql`
  mutation UpdateProduct($UpdateProductInput: UpdateProductInput!) {
    updateProduct(UpdateProductInput: $UpdateProductInput) {
      code
      success
      message
      product {
        _id
        title
        description
        category
        price
        expense
        media
        collections
        tags
        sizes
        colors
        createdAt
        updatedAt
      }
    }
  }
`;
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it Date options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at Date time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      UpdateProductInput: // value for 'UpdateProductInput'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>;
export type UpdateProductMutationResult =
  Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>;
export const GetListCollectionDocument = gql`
  query getListCollection {
    getListCollection {
      code
      success
      message
      listCollection {
        _id
        title
        description
        image
        createdAt
        updatedAt
        products {
          _id
          title
          description
          category
          price
          expense
          media
          collections
          tags
          sizes
          colors
          createdAt
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useGetListCollectionQuery__
 *
 * To run a query within a React component, call `useGetListCollectionQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetListCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListCollectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListCollectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetListCollectionQuery,
    GetListCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetListCollectionQuery,
    GetListCollectionQueryVariables
  >(GetListCollectionDocument, options);
}
export function useGetListCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetListCollectionQuery,
    GetListCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetListCollectionQuery,
    GetListCollectionQueryVariables
  >(GetListCollectionDocument, options);
}
export function useGetListCollectionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetListCollectionQuery,
        GetListCollectionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetListCollectionQuery,
    GetListCollectionQueryVariables
  >(GetListCollectionDocument, options);
}
export type GetListCollectionQueryHookResult = ReturnType<
  typeof useGetListCollectionQuery
>;
export type GetListCollectionLazyQueryHookResult = ReturnType<
  typeof useGetListCollectionLazyQuery
>;
export type GetListCollectionSuspenseQueryHookResult = ReturnType<
  typeof useGetListCollectionSuspenseQuery
>;
export type GetListCollectionQueryResult = Apollo.QueryResult<
  GetListCollectionQuery,
  GetListCollectionQueryVariables
>;
export const GetCollectionDocument = gql`
  query getCollection($GetCollectionInput: GetCollectionInput!) {
    getCollection(GetCollectionInput: $GetCollectionInput) {
      code
      success
      message
      collection {
        _id
        title
        description
        image
        createdAt
        updatedAt
        products {
          _id
          title
          description
          category
          price
          expense
          media
          collections
          tags
          sizes
          colors
          createdAt
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useGetCollectionQuery__
 *
 * To run a query within a React component, call `useGetCollectionQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionQuery({
 *   variables: {
 *      GetCollectionInput: // value for 'GetCollectionInput'
 *   },
 * });
 */
export function useGetCollectionQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCollectionQuery,
    GetCollectionQueryVariables
  > &
    (
      | { variables: GetCollectionQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCollectionQuery, GetCollectionQueryVariables>(
    GetCollectionDocument,
    options
  );
}
export function useGetCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionQuery,
    GetCollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCollectionQuery, GetCollectionQueryVariables>(
    GetCollectionDocument,
    options
  );
}
export function useGetCollectionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCollectionQuery,
        GetCollectionQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCollectionQuery,
    GetCollectionQueryVariables
  >(GetCollectionDocument, options);
}
export type GetCollectionQueryHookResult = ReturnType<
  typeof useGetCollectionQuery
>;
export type GetCollectionLazyQueryHookResult = ReturnType<
  typeof useGetCollectionLazyQuery
>;
export type GetCollectionSuspenseQueryHookResult = ReturnType<
  typeof useGetCollectionSuspenseQuery
>;
export type GetCollectionQueryResult = Apollo.QueryResult<
  GetCollectionQuery,
  GetCollectionQueryVariables
>;
export const GetCollectionTitleDocument = gql`
  query GetCollectionTitle($_id: String!) {
    getCollectionTitle(_id: $_id)
  }
`;

/**
 * __useGetCollectionTitleQuery__
 *
 * To run a query within a React component, call `useGetCollectionTitleQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetCollectionTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionTitleQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetCollectionTitleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCollectionTitleQuery,
    GetCollectionTitleQueryVariables
  > &
    (
      | { variables: GetCollectionTitleQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectionTitleQuery,
    GetCollectionTitleQueryVariables
  >(GetCollectionTitleDocument, options);
}
export function useGetCollectionTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionTitleQuery,
    GetCollectionTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectionTitleQuery,
    GetCollectionTitleQueryVariables
  >(GetCollectionTitleDocument, options);
}
export function useGetCollectionTitleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCollectionTitleQuery,
        GetCollectionTitleQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCollectionTitleQuery,
    GetCollectionTitleQueryVariables
  >(GetCollectionTitleDocument, options);
}
export type GetCollectionTitleQueryHookResult = ReturnType<
  typeof useGetCollectionTitleQuery
>;
export type GetCollectionTitleLazyQueryHookResult = ReturnType<
  typeof useGetCollectionTitleLazyQuery
>;
export type GetCollectionTitleSuspenseQueryHookResult = ReturnType<
  typeof useGetCollectionTitleSuspenseQuery
>;
export type GetCollectionTitleQueryResult = Apollo.QueryResult<
  GetCollectionTitleQuery,
  GetCollectionTitleQueryVariables
>;
export const GetListOrderDocument = gql`
  query GetListOrder {
    getListOrder {
      code
      success
      message
      listOrder {
        _id
        customer
        products
        totalAmount
        createdAt
      }
    }
  }
`;

/**
 * __useGetListOrderQuery__
 *
 * To run a query within a React component, call `useGetListOrderQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetListOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListOrderQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetListOrderQuery,
    GetListOrderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetListOrderQuery, GetListOrderQueryVariables>(
    GetListOrderDocument,
    options
  );
}
export function useGetListOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetListOrderQuery,
    GetListOrderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetListOrderQuery, GetListOrderQueryVariables>(
    GetListOrderDocument,
    options
  );
}
export function useGetListOrderSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetListOrderQuery,
        GetListOrderQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetListOrderQuery, GetListOrderQueryVariables>(
    GetListOrderDocument,
    options
  );
}
export type GetListOrderQueryHookResult = ReturnType<
  typeof useGetListOrderQuery
>;
export type GetListOrderLazyQueryHookResult = ReturnType<
  typeof useGetListOrderLazyQuery
>;
export type GetListOrderSuspenseQueryHookResult = ReturnType<
  typeof useGetListOrderSuspenseQuery
>;
export type GetListOrderQueryResult = Apollo.QueryResult<
  GetListOrderQuery,
  GetListOrderQueryVariables
>;
export const GetOrderDetailDocument = gql`
  query GetOrderDetail($detailsOrderInput: DetailsOrderInput!) {
    getOrderDetails(detailsOrderInput: $detailsOrderInput) {
      code
      success
      message
      order {
        _id
        customerClerkId
        customerName
        address
        phone
        totalAmount
        email
        createdAt
        updatedAt
        products {
          color
          size
          quantity
          product {
            _id
            title
            description
            category
            price
            expense
            media
            collections
            tags
            sizes
            colors
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

/**
 * __useGetOrderDetailQuery__
 *
 * To run a query within a React component, call `useGetOrderDetailQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetOrderDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderDetailQuery({
 *   variables: {
 *      detailsOrderInput: // value for 'detailsOrderInput'
 *   },
 * });
 */
export function useGetOrderDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOrderDetailQuery,
    GetOrderDetailQueryVariables
  > &
    (
      | { variables: GetOrderDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOrderDetailQuery, GetOrderDetailQueryVariables>(
    GetOrderDetailDocument,
    options
  );
}
export function useGetOrderDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrderDetailQuery,
    GetOrderDetailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOrderDetailQuery, GetOrderDetailQueryVariables>(
    GetOrderDetailDocument,
    options
  );
}
export function useGetOrderDetailSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetOrderDetailQuery,
        GetOrderDetailQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetOrderDetailQuery,
    GetOrderDetailQueryVariables
  >(GetOrderDetailDocument, options);
}
export type GetOrderDetailQueryHookResult = ReturnType<
  typeof useGetOrderDetailQuery
>;
export type GetOrderDetailLazyQueryHookResult = ReturnType<
  typeof useGetOrderDetailLazyQuery
>;
export type GetOrderDetailSuspenseQueryHookResult = ReturnType<
  typeof useGetOrderDetailSuspenseQuery
>;
export type GetOrderDetailQueryResult = Apollo.QueryResult<
  GetOrderDetailQuery,
  GetOrderDetailQueryVariables
>;
export const GetOrderByCustomerDocument = gql`
  query GetOrderByCustomer($customerClerkId: String!) {
    getOrderByCustomer(customerClerkId: $customerClerkId) {
      code
      success
      message
      listOrder {
        _id
        customerClerkId
        customerName
        address
        phone
        totalAmount
        email
        createdAt
        updatedAt
        products {
          color
          size
          quantity
          product {
            _id
            title
            description
            category
            price
            expense
            media
            collections
            tags
            sizes
            colors
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

/**
 * __useGetOrderByCustomerQuery__
 *
 * To run a query within a React component, call `useGetOrderByCustomerQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetOrderByCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByCustomerQuery({
 *   variables: {
 *      customerClerkId: // value for 'customerClerkId'
 *   },
 * });
 */
export function useGetOrderByCustomerQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetOrderByCustomerQuery,
    GetOrderByCustomerQueryVariables
  > &
    (
      | { variables: GetOrderByCustomerQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetOrderByCustomerQuery,
    GetOrderByCustomerQueryVariables
  >(GetOrderByCustomerDocument, options);
}
export function useGetOrderByCustomerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrderByCustomerQuery,
    GetOrderByCustomerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOrderByCustomerQuery,
    GetOrderByCustomerQueryVariables
  >(GetOrderByCustomerDocument, options);
}
export function useGetOrderByCustomerSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetOrderByCustomerQuery,
        GetOrderByCustomerQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetOrderByCustomerQuery,
    GetOrderByCustomerQueryVariables
  >(GetOrderByCustomerDocument, options);
}
export type GetOrderByCustomerQueryHookResult = ReturnType<
  typeof useGetOrderByCustomerQuery
>;
export type GetOrderByCustomerLazyQueryHookResult = ReturnType<
  typeof useGetOrderByCustomerLazyQuery
>;
export type GetOrderByCustomerSuspenseQueryHookResult = ReturnType<
  typeof useGetOrderByCustomerSuspenseQuery
>;
export type GetOrderByCustomerQueryResult = Apollo.QueryResult<
  GetOrderByCustomerQuery,
  GetOrderByCustomerQueryVariables
>;
export const GetListProductDocument = gql`
  query GetListProduct {
    getListProduct {
      code
      success
      message
      listProduct {
        _id
        title
        description
        category
        price
        expense
        media
        collections
        tags
        sizes
        colors
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetListProductQuery__
 *
 * To run a query within a React component, call `useGetListProductQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetListProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListProductQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListProductQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetListProductQuery,
    GetListProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetListProductQuery, GetListProductQueryVariables>(
    GetListProductDocument,
    options
  );
}
export function useGetListProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetListProductQuery,
    GetListProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetListProductQuery, GetListProductQueryVariables>(
    GetListProductDocument,
    options
  );
}
export function useGetListProductSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetListProductQuery,
        GetListProductQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetListProductQuery,
    GetListProductQueryVariables
  >(GetListProductDocument, options);
}
export type GetListProductQueryHookResult = ReturnType<
  typeof useGetListProductQuery
>;
export type GetListProductLazyQueryHookResult = ReturnType<
  typeof useGetListProductLazyQuery
>;
export type GetListProductSuspenseQueryHookResult = ReturnType<
  typeof useGetListProductSuspenseQuery
>;
export type GetListProductQueryResult = Apollo.QueryResult<
  GetListProductQuery,
  GetListProductQueryVariables
>;
export const GetProductDetailDocument = gql`
  query getProductDetail($getProductInput: GetProductInput!) {
    getProductDetail(getProductInput: $getProductInput) {
      code
      success
      message
      product {
        _id
        title
        description
        category
        price
        expense
        media
        colors
        collections
        tags
        sizes
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetProductDetailQuery__
 *
 * To run a query within a React component, call `useGetProductDetailQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetProductDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductDetailQuery({
 *   variables: {
 *      getProductInput: // value for 'getProductInput'
 *   },
 * });
 */
export function useGetProductDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProductDetailQuery,
    GetProductDetailQueryVariables
  > &
    (
      | { variables: GetProductDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProductDetailQuery, GetProductDetailQueryVariables>(
    GetProductDetailDocument,
    options
  );
}
export function useGetProductDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProductDetailQuery,
    GetProductDetailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProductDetailQuery,
    GetProductDetailQueryVariables
  >(GetProductDetailDocument, options);
}
export function useGetProductDetailSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProductDetailQuery,
        GetProductDetailQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProductDetailQuery,
    GetProductDetailQueryVariables
  >(GetProductDetailDocument, options);
}
export type GetProductDetailQueryHookResult = ReturnType<
  typeof useGetProductDetailQuery
>;
export type GetProductDetailLazyQueryHookResult = ReturnType<
  typeof useGetProductDetailLazyQuery
>;
export type GetProductDetailSuspenseQueryHookResult = ReturnType<
  typeof useGetProductDetailSuspenseQuery
>;
export type GetProductDetailQueryResult = Apollo.QueryResult<
  GetProductDetailQuery,
  GetProductDetailQueryVariables
>;
export const SearchProductDocument = gql`
  query SearchProduct($productQuery: String!) {
    searchProduct(productQuery: $productQuery) {
      code
      success
      message
      listProduct {
        _id
        title
        description
        category
        price
        expense
        media
        collections
        tags
        sizes
        colors
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useSearchProductQuery__
 *
 * To run a query within a React component, call `useSearchProductQuery` and pass it Date options that fit your needs.
 * When your component renders, `useSearchProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductQuery({
 *   variables: {
 *      productQuery: // value for 'productQuery'
 *   },
 * });
 */
export function useSearchProductQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchProductQuery,
    SearchProductQueryVariables
  > &
    (
      | { variables: SearchProductQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchProductQuery, SearchProductQueryVariables>(
    SearchProductDocument,
    options
  );
}
export function useSearchProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchProductQuery,
    SearchProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchProductQuery, SearchProductQueryVariables>(
    SearchProductDocument,
    options
  );
}
export function useSearchProductSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SearchProductQuery,
        SearchProductQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SearchProductQuery,
    SearchProductQueryVariables
  >(SearchProductDocument, options);
}
export type SearchProductQueryHookResult = ReturnType<
  typeof useSearchProductQuery
>;
export type SearchProductLazyQueryHookResult = ReturnType<
  typeof useSearchProductLazyQuery
>;
export type SearchProductSuspenseQueryHookResult = ReturnType<
  typeof useSearchProductSuspenseQuery
>;
export type SearchProductQueryResult = Apollo.QueryResult<
  SearchProductQuery,
  SearchProductQueryVariables
>;
export const GetRelatedProductDocument = gql`
  query GetRelatedProduct($mainProductId: String!) {
    getRelatedProduct(mainProductId: $mainProductId) {
      code
      success
      message
      listProduct {
        _id
        title
        description
        category
        price
        expense
        media
        collections
        tags
        sizes
        colors
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetRelatedProductQuery__
 *
 * To run a query within a React component, call `useGetRelatedProductQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetRelatedProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRelatedProductQuery({
 *   variables: {
 *      mainProductId: // value for 'mainProductId'
 *   },
 * });
 */
export function useGetRelatedProductQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRelatedProductQuery,
    GetRelatedProductQueryVariables
  > &
    (
      | { variables: GetRelatedProductQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRelatedProductQuery,
    GetRelatedProductQueryVariables
  >(GetRelatedProductDocument, options);
}
export function useGetRelatedProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRelatedProductQuery,
    GetRelatedProductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRelatedProductQuery,
    GetRelatedProductQueryVariables
  >(GetRelatedProductDocument, options);
}
export function useGetRelatedProductSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetRelatedProductQuery,
        GetRelatedProductQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetRelatedProductQuery,
    GetRelatedProductQueryVariables
  >(GetRelatedProductDocument, options);
}
export type GetRelatedProductQueryHookResult = ReturnType<
  typeof useGetRelatedProductQuery
>;
export type GetRelatedProductLazyQueryHookResult = ReturnType<
  typeof useGetRelatedProductLazyQuery
>;
export type GetRelatedProductSuspenseQueryHookResult = ReturnType<
  typeof useGetRelatedProductSuspenseQuery
>;
export type GetRelatedProductQueryResult = Apollo.QueryResult<
  GetRelatedProductQuery,
  GetRelatedProductQueryVariables
>;
export const GetListUserDocument = gql`
  query GetListUser {
    getListUser {
      code
      success
      message
      listUser {
        _id
        clerkId
        email
        name
        wishlist
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetListUserQuery__
 *
 * To run a query within a React component, call `useGetListUserQuery` and pass it Date options that fit your needs.
 * When your component renders, `useGetListUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetListUserQuery,
    GetListUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetListUserQuery, GetListUserQueryVariables>(
    GetListUserDocument,
    options
  );
}
export function useGetListUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetListUserQuery,
    GetListUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetListUserQuery, GetListUserQueryVariables>(
    GetListUserDocument,
    options
  );
}
export function useGetListUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetListUserQuery,
        GetListUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetListUserQuery, GetListUserQueryVariables>(
    GetListUserDocument,
    options
  );
}
export type GetListUserQueryHookResult = ReturnType<typeof useGetListUserQuery>;
export type GetListUserLazyQueryHookResult = ReturnType<
  typeof useGetListUserLazyQuery
>;
export type GetListUserSuspenseQueryHookResult = ReturnType<
  typeof useGetListUserSuspenseQuery
>;
export type GetListUserQueryResult = Apollo.QueryResult<
  GetListUserQuery,
  GetListUserQueryVariables
>;