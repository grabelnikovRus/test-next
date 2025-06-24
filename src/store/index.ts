import { create } from 'zustand';
import { ProductItemType } from '../types';
import { persist } from 'zustand/middleware';

interface StoreType {
  products: Array<ProductItemType & { count: number }>;
  phone: string;
  setPhone: (phone: string) => void;
  add: (obj: ProductItemType) => void;
  changeCount: (id: number, value: number) => void;
  reset: () => void;
}

const useStore = create<StoreType>()(
  persist(
    (set) => ({
      products: [] as StoreType["products"],
      phone: '',
      setPhone: (phone: string) => set({ phone }),
      add: (obj) => set((state) => ({
        products: [...state.products, { ...obj, count: 1 }]
      })),
      changeCount: (id, value) => set((state) => ({
        products: state.products.map((el) =>
          el.id === id ? { ...el, count: value } : el
        )
      })),
      reset: () => set({ products: [], phone: "" }),
    }),
    {
      name: "test-shop",
    }
  )
);

export default useStore;
