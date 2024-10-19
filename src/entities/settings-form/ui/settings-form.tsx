import { useForm } from "react-hook-form";

import { Input, Upload, Button, readFile, addSecretCode } from "@/shared";

import "./settings-form.sass";

import type { Secret } from "@/shared";

type SettingsFormProps = {
  onSave: () => void;
};

type SettingsFormValues = Omit<Secret, "addedDate"> & {
  icon: FileList | null;
};

const defaultValues: SettingsFormValues = {
  name: "",
  secret: "",
  icon: null,
};

export const SettingsForm = ({ onSave }: SettingsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({ defaultValues });

  const onSubmit = async (values: SettingsFormValues) => {
    const file = values.icon?.[0];
    let icon = null;

    if (file) {
      icon = await readFile(file, "url");
    }

    const extendedValues: Secret = {
      name: values.name,
      secret: values.secret.replace(/\s/g, "").toUpperCase(),
      addedDate: Date.now(),
      icon,
    };

    await addSecretCode(extendedValues);

    onSave();
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
