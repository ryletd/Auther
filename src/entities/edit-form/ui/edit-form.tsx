import { useForm } from "react-hook-form";

import { Input, Upload, Button, readFile, addSecretCode } from "@/shared";

import "./edit-form.sass";

import type { Secret } from "@/shared";

type EditFormProps = {
  name: string;
  onCancel: () => void;
  onEdit: () => void;
};

type EditFormValues = Omit<Secret, "addedDate"> & {
  icon: FileList | null;
};

const defaultValues: EditFormValues = {
  name: "",
  secret: "",
  icon: null,
};

export const EditForm = ({ name, onCancel }: EditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormValues>({ defaultValues });

  const onSubmit = async (values: EditFormValues) => {
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

    onCancel();
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">
        Edit <span>{name}</span> code
      </h2>
      <Input<EditFormValues>
        name="name"
        label="Name"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Input<EditFormValues>
        name="secret"
        label="Secret code"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Upload<EditFormValues> name="icon" label="Icon" register={register} errors={errors} />
      <div className="buttons">
        <Button className="cancel-button">Cancel</Button>
        <Button type="submit" className="save-button">
          Save
        </Button>
      </div>
    </form>
  );
};
