import Image from "next/image";
import { ProductItemType } from "@/src/types";
import fallbackImage from '@/public/fallback.jpg';
import { CounterProducts } from "../counter-products";
import { priceFormat } from "@/src/shared/priceFormat";
import s from "./Card.module.css";

export const Card = (props: ProductItemType) => {
  return (
    <li className={s.card}>
      <Image 
        src={props.image_url} 
        alt={`Фото ${props.title}`}
        width={268}
        height={320}
        className={s.img}
        unoptimized
        onError={(e) => {
          e.currentTarget.src = fallbackImage.src;
          e.currentTarget.onerror = null;
        }}
      />
      <span className={s.title}>{props.title}</span>
      <span className={s.description}>{props.description}</span>
      <span className={s.price}>
        {`Цена: ${priceFormat.format(props.price)}`}
      </span>
      <CounterProducts {...props}/>
    </li>
  )
};
