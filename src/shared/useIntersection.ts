import { useCallback, useRef } from "react";

export const useIntersection = (onIntersect: () => void) => {
  const ref = useRef(() => { });

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect()
        }
      })
    })
    if (el) {
      observer.observe(el);
      ref.current = () => observer.disconnect()
    } else {
      ref.current()
    }
  }, [])
};
