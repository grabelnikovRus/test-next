import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import s from "./Input.module.css";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > { 
    error?: boolean
  };
  
export const Input = ({ error, disabled, ...props }: InputProps) => {
  return (
    <input 
      {...props} 
      className={`${s.input} ${error ? s.error : ""} ${disabled ? s.disabled : ""}`}
      disabled={disabled}
    />
  )
};
