import { 
  ProductsType, 
  ResponseSendProductsType, 
  ReviewsType, 
  SendProductsType 
} from "../types";

const baseUrl = "http://o-complex.com:1337";

export const api = {
  async getReviews(): Promise<ReviewsType[]> {
    const res = await fetch(`${baseUrl}/reviews`);
    return await res.json();
  },

  async getProducts(page?: number): Promise<ProductsType> {
    const res = await fetch(`${baseUrl}/products?page=${page ?? 1}&page_size=20` )
    return res.json();
  },

  async sendProducts(body: SendProductsType): Promise<ResponseSendProductsType> {
    const res = await fetch(`${baseUrl}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    return res.json();
  }
};
