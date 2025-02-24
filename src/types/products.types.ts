export type Product = {
  _id: string;
  productName: string;
  image: string;
  inventoryCount: number;
  createdAt: Date;
  totalRevenue?: number;
  description: string;
  price: number;
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

export type SalesHistoryRecord = {
  _id: string;
  ProductID: {
    _id: string;
    productName: string;
  };
  TraineeID: {
    _id: string;
    name: string;
  };
  quantitySold: number;
  price: number;
  totalSaleValue: number;
  SaleDate: Date;
  createdAt: Date;
};
