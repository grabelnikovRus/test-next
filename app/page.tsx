import { Reviews } from "@/src/components/reviews";

import s from "./page.module.css";
import { getQueryClient } from "@/src/shared/getQueryClient";
import { reviewsOptions } from "@/src/api/rewiews";
import { Products } from "@/src/components/products";
import { Basket } from "@/src/components/basket";

export default async function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(reviewsOptions)

  return (
    <div className={s.page}>
      <Reviews/>
      <Basket/>
      <Products/>
    </div>
  );
}
