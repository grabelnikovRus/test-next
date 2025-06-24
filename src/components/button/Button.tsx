import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";
import s from "./Button.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > { };

export const Button = ({
  children,
  className,
  disabled,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button 
      className={`${s.button} ${s.className} ${disabled ? s.disabled : ""}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
};
