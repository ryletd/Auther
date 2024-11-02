import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Upload, Button, editSecretCode, useAutherConfigStore, TabPanel, Tabs } from "@/shared";

import "./edit-form.sass";

import type { Secret } from "@/shared";

type EditFormProps = {
  secret: Secret;
  onClose: () => void;
};

type EditFormValues = Omit<Secret, "addedDate">;

export const EditForm = ({ secret, onClose }: EditFormProps) => {
  const [tab, setTab] = useState<number>(0);
  const { autherConfig } = useAutherConfigStore();
  const defaultValues = autherConfig.secrets.find((item) => item.secret === secret.secret) as EditFormValues;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditFormValues>({ defaultValues });
  const icon = watch("icon");

  const onSubmit = async (values: EditFormValues) => {
    const extendedValues: Secret = {
      ...secret,
      name: values.name,
      secret: values.secret.replace(/\s/g, "").toUpperCase(),
      icon: values.icon,
    };

    await editSecretCode(extendedValues);

    onClose();
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="title">
        Edit <span>{secret.name}</span> code
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
      <Tabs buttons={["Upload", "Link"]} value={tab} onChange={setTab} />
      <TabPanel value={tab} index={0}>
        <Upload<EditFormValues> name="icon" label="Icon" setValue={setValue} watch={watch} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Input
          name="icon"
          label="Icon"
          register={register}
          errors={errors}
          registerOptions={{ required: true, min: 1 }}
        />
        {icon?.startsWith("https://") && <img className="image-link" src={icon} alt="icon" />}
      </TabPanel>
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
