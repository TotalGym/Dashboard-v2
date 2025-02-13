export type Product = {
  _id: string;
  productName: string;
  image: string;
  inventoryCount: number;
  createdAt: Date;
  description: string;
};

export type GetProductsResponse = {
  results: Product[];
  totalCount: number;
  page: number;
  limit: number;
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
};
