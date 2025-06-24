'use client'
import DOMPurify from 'isomorphic-dompurify';
import { useSuspenseQuery } from '@tanstack/react-query';
import { reviewsOptions } from '@/src/api/rewiews';
import s from "./Reviews.module.css";

export const Reviews = () => {
  const { data } = useSuspenseQuery(reviewsOptions);

  return (
    <ul className={s.list}>
      {data?.map(({ id, text }) => (
        <li
          className={s.item}
          key={id} 
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} 
        />
      ))}
    </ul>
  )
};
