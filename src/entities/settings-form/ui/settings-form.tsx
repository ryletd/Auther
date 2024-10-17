import { useForm } from "react-hook-form";

import { Input } from "@/shared";
import { Upload } from "@/shared";
import { Button } from "@/shared";

import "./settings-form.sass";

import type { Secret } from "@/shared";

export const SettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Secret>();

  const onSubmit = (values: Secret) => {
    console.log(values);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">Add new 2fa code</h2>
      <Input
        name="name"
        label="Name"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Input
        name="secret"
        label="Secret code"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Upload name="icon" label="Icon" register={register} errors={errors} registerOptions={{ required: true }} />
      <Button type="submit" className="save-button">Save</Button>
    </form>
  );
};
