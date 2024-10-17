import "./input.sass";

import type { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";
import type { Secret } from "@/shared";

type InputProps = {
  label: string;
  name: keyof Secret;
  register: UseFormRegister<Secret>;
  errors: FieldErrors<Secret>;
  registerOptions?: RegisterOptions<Secret>;
  type?: "text" | "password";
};

export const Input = ({ label, name, register, errors, registerOptions, type = "text" }: InputProps) => (
  <div className="input-wrapper">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <input className="input" id={name} type={type} {...register(name, registerOptions)} autoComplete="off" />
    {errors[name] && <span className="error">{errors[name].message}</span>}
  </div>
);
