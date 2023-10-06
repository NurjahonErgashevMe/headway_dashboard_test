export type ProductType = {
  id: string;
  name_uz: string;
  name_ru: string;
  name_lat: string;
  image: string;
  category_id: string;
  price: number;
  count: number;
  owner_id: string;
  characteristic: {
    color?: string;
  };
  description: string;
  is_deleted: boolean;
  created_at: string;
  sale_price: number;
};
