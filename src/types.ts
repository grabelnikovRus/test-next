export type ReviewsType = {
  id: number;
  text: string;
};

export type ProductItemType ={
  id: number
  image_url: string
  title: string
  description: string
  price: number;
}

export type ProductsType = {
  page: number;
  amount: number;
  total: number;
  items: ProductItemType[];
};

export type SendProductsType = {
  phone: string;
  cart: Array<{id: number; quantity: number;}>;
};

export type ResponseSendProductsType = {
  success: 0 | 1;
  error?: string;
};
