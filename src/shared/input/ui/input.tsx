import classNames from "classnames";

import "./input.sass";

import type { UseFormRegister, FieldErrors, RegisterOptions, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  errors: FieldErrors<T>;
  registerOptions?: RegisterOptions<T>;
  placeholder?: string;
  type?: "text" | "password";
};

export const Input = <T extends FieldValues>({
  label,
  name,
  register,
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
      {...register?.(name, registerOptions)}
    />
  </div>
);
