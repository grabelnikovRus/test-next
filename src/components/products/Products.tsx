"use client";
import { api } from "@/src/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card } from "../card";
import { useIntersection } from "@/src/shared/useIntersection";
import s from "./Products.module.css";

export const Products = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, ...r} = useInfiniteQuery({
    queryKey: ['products', ],
    queryFn: (meta) => api.getProducts(meta.pageParam),
    initialPageParam: 1,
    getNextPageParam: (result) => result.page + 1,
    select: (result) => result.pages.map((page) => page.items).flat()
  });

  const ref = useIntersection(() => {
    fetchNextPage();
  });

  if (isLoading) return <div className={s.loading}>Идет загрузка...</div>;

  return (
    <ul className={s.list}>
      {data?.map((el) => (<Card key={el.id} {...el}/>))}
      <div ref={ref}/>
      {hasNextPage && <div className={s.loading}>Все товары загружены</div>}
    </ul>
  )
};
