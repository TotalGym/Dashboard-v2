export type Equipment = {
  _id: string;
  name: string;
  type: string;
  quantity: number;
  image: string;
  status: "Available" | "Under Maintenance";
  createdAt: Date;
};

export type GetEquipmentResponse = {
  results: Equipment[];
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
