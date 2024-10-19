import { useForm } from "react-hook-form";

import { Input } from "@/shared";
import { Upload } from "@/shared";
import { Button } from "@/shared";

import "./settings-form.sass";

import type { Secret } from "@/shared";

export type SettingsFormValues = Omit<Secret, "addedDate"> & {
  icon: FileList | null;
};

const defaultValues: SettingsFormValues = {
  name: "",
  secret: "",
  icon: null,
};

export const SettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({ defaultValues });

  const onSubmit = (values: SettingsFormValues) => {
    const extendedValues: Secret = { ...values, secret: values.secret.replace(/\s/g, ""), addedDate: Date.now() };

    console.log(extendedValues);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">Add new 2fa code</h2>
      <Input<SettingsFormValues>
        name="name"
        label="Name"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Input<SettingsFormValues>
        name="secret"
        label="Secret code"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Upload<SettingsFormValues> name="icon" label="Icon" register={register} errors={errors} />
      <Button type="submit" className="save-button">
        Save
      </Button>
    </form>
  );
};
