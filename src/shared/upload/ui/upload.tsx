import classNames from "classnames";

import "./upload.sass";

import type { UseFormRegister, FieldErrors, RegisterOptions, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  registerOptions?: RegisterOptions<T>;
};

export const Upload = <T extends FieldValues>({ label, name, register, errors, registerOptions }: InputProps<T>) => (
  <div className="upload-wrapper">
    {label && <label className="label">{label}</label>}
    <input
      className={classNames("upload", { error: errors[name] })}
      type="file"
      accept="image/*"
      {...register(name, registerOptions)}
    />
  </div>
);
