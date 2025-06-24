"use client";
import useStore from "@/src/store";
import { Button } from "../button";
import { priceFormat } from "@/src/shared/priceFormat";
import { Input } from "../input";
import { useEffect, useState } from "react";
import { getIsValidPhone } from "@/src/shared/getIsValidPhone";
import { formattedPhone } from "@/src/shared/formattedPhone";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/api";
import { SendProductsType } from "@/src/types";
import s from "./Basket.module.css";
import { Modal } from "../modal";

export const Basket = () => {
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { products, reset, phone, setPhone } = useStore();

  const { mutate, isPending, data } = useMutation({
    mutationKey: [""],
    mutationFn: async ({ phone, cart }: SendProductsType) => await api.sendProducts(
      { phone, cart }
    )
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = formattedPhone(value);

    if (formattedValue.length === 18) setError(false);

    setPhone(formattedValue);
  };

  const onClickBtn = () => {
    const isValidPhone = getIsValidPhone(phone);

    if (!products.length) {
      setIsEmpty(true);
      return;
    }

    if (isValidPhone) {
      mutate({ 
        phone: phone.replace(/\D/g, ''), 
        cart: products.map(({ id, count }) => ({ id, quantity: count })) 
      });
      reset();
    } else {
      setError(true);
    };
  };

  useEffect(() => {
    if (data?.success) setIsOpen(true);
  }, [data?.success]);

  useEffect(() => {
    if (products.length) setIsEmpty(false);
  }, [products.length]);

  return (<>
    <div className={s.basket}>
      <span className={s.title}>Добавленные товары</span>
      {isEmpty && <span className={s.empty}>Выберите товар</span>}
      <ul className={s.list}>
        {products.map(({ id, count, price, title }) => count > 0 && (
          <li key={id} className={s.item}>
            <span className={s.name}>{title}</span>
            <span className={s.count}>{`x${count}`}</span>
            {priceFormat.format(count * price)}
          </li>
        ))}
      </ul>
      <Input 
        value={phone}
        placeholder="+7 (___) ___-__-__"
        onChange={handlePhoneChange}
        error={error}
        className={s.input}
        disabled={isPending}
      />
      <Button 
        onClick={onClickBtn} 
        className={s.btn}
        disabled={isPending}
      >
        Заказать
      </Button>
    </div>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      Заказ успешно отправлен
    </Modal>
  </>)
};
