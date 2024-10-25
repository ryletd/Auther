import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Upload, Button, addSecretCode, Tabs, TabPanel } from "@/shared";

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

  console.log(tab);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddFormValues>({ defaultValues });

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
      <Tabs buttons={["Upload", "Link"]} value={tab} onChange={(index: number) => setTab(index)} />
      <TabPanel value={tab} index={0}>
        <Upload<AddFormValues> name="icon" label="Icon" setValue={setValue} watch={watch} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Input
          name="icon"
          label="Icon"
          register={register}
          errors={errors}
          registerOptions={{ required: true, min: 1 }}
        />
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
