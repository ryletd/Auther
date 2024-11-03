import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Upload, Button, addSecretCode, Tabs, Tab } from "@/shared";

import "./add-form.sass";

import type { Secret } from "@/shared";

type AddFormProps = {
  onClose: () => void;
};

type AddFormValues = Omit<Secret, "id" | "addedDate">;

const defaultValues: AddFormValues = {
  name: "",
  secret: "",
  icon: null,
};

export const AddForm = ({ onClose }: AddFormProps) => {
  const [tab, setTab] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddFormValues>({ defaultValues });
  const icon = watch("icon");

  const onSubmit = async (values: AddFormValues) => {
    const extendedValues: Omit<Secret, "id" | "addedDate"> = {
      name: values.name,
      secret: values.secret.replace(/\s/g, "").toUpperCase(),
      icon: values.icon,
    };

    await addSecretCode(extendedValues);

    onClose();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">Add new 2fa code</h2>
      <Input<AddFormValues>
        name="name"
        label="Name"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Input<AddFormValues>
        name="secret"
        label="Secret code"
        register={register}
        errors={errors}
        registerOptions={{ required: true, min: 1 }}
      />
      <Tabs buttons={["Upload", "Link"]} value={tab} onChange={setTab} />
      <Tab value={tab} index={0}>
        <Upload<AddFormValues> name="icon" label="Icon" setValue={setValue} watch={watch} />
      </Tab>
      <Tab value={tab} index={1}>
        <Input
          name="icon"
          label="Icon"
          register={register}
          errors={errors}
          registerOptions={{ required: false, min: 1 }}
        />
        {icon && <img className="image-link" src={icon} alt="icon" />}
      </Tab>
      <div className="buttons">
        <Button className="cancel-button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="save-button">
          Save
        </Button>
      </div>
    </form>
  );
};
