export type OrderType = {
  id: string;
  product_id: string;
  count: 5;
  client_data: {
    phone: string;
    last_name: string;
    first_name: string;
  };
  price: 500000;
  seller_id: string;
  status: 0;
  is_deleted: boolean;
  created_at: string;
};
