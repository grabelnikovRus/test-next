"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { ProductItemType } from "@/src/types";
import useStore from "@/src/store";
import s from "./CounterProducts.module.css";

export const CounterProducts = (props: ProductItemType) => {
  const [isClick, setIsClick] = useState(false);
  const [count, setCount] = useState(1);
  const { products, add, changeCount } = useStore();

  const clickCounter = (value: number) => {
    let newValue = count + value;

    if (newValue < 0) newValue = 0;

    setCount(newValue);
    changeCount(props.id, newValue);
  }

  const clickButtonBuy = () => {
    setIsClick(true);
    add(props);
  }

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value.replace(/\D/ig, "");

    setCount(value);
    changeCount(props.id, value);
  }

  useEffect(() => {
    if (!products.length) {
      setCount(1);
      setIsClick(false);
    };
  }, [products.length]);

  return (
    <div className={s.block}>
      {isClick ? (
        <div className={s.counter}>
          <Button onClick={clickCounter.bind(null, -1)}>&ndash;</Button>
          <Input value={count} onChange={changeInput}/>
          <Button onClick={clickCounter.bind(null, 1)}>+</Button>
        </div>
      ) : (
        <Button onClick={clickButtonBuy}>Купить</Button>
      )}
    </div>
  )
};
