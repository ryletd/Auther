import "./upload.sass";

import type { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";
import type { Secret } from "@/shared";

type UploadProps = {
  label: string;
  name: keyof Secret;
  register: UseFormRegister<Secret>;
  errors: FieldErrors<Secret>;
  registerOptions?: RegisterOptions<Secret>;
  type?: "text" | "password";
};

export const Upload = ({ label, name, register, errors, registerOptions, type = "text" }: UploadProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...register(name, registerOptions)} />
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
};
