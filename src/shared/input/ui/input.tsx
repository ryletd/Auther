import classNames from "classnames";

import "./input.sass";

import type { UseFormRegister, FieldErrors, RegisterOptions, FieldValues, Path } from "react-hook-form";

import type { ChangeEvent } from "react";

type InputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<T>;
  registerOptions?: RegisterOptions<T>;
  placeholder?: string;
  type?: "text" | "password";
};

export const Input = <T extends FieldValues>({
  label,
  name,
  register,
  onChange,
  errors,
  registerOptions,
  type = "text",
  placeholder,
}: InputProps<T>) => (
  <div className="input-wrapper">
    {label && (
      <label className="label" htmlFor={name}>
        {label}
      </label>
    )}
    <input
      className={classNames("input", { error: errors[name] })}
      id={name}
      type={type}
      autoComplete="off"
      placeholder={placeholder}
      {...(onChange ? { onChange } : register ? register(name, registerOptions) : {})}
    />
  </div>
);
