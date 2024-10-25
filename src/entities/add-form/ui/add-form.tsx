import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Upload, Button, readFile, addSecretCode, Tabs } from "@/shared";

import "./add-form.sass";

import type { Secret } from "@/shared";
import { TabPanel } from "@/shared/tabs/tab-panel";

type AddFormProps = {
  onClose: () => void;
};

type AddFormValues = Omit<Secret, "addedDate"> & {
  icon: FileList | null;
};

const defaultValues: AddFormValues = {
  name: "",
  secret: "",
  icon: null,
};

export const AddForm = ({ onClose }: AddFormProps) => {
  const [valueTabs, setValueTabs] = useState(0);

  const handleTabChange = (index: number) => {
    setValueTabs(index);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormValues>({ defaultValues });

  const onSubmit = async (values: AddFormValues) => {
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
      <Tabs buttons={["Upload", "Link"]} value={valueTabs} onChange={handleTabChange} />
      <TabPanel value={valueTabs} index={0}>
        <Upload<AddFormValues> name="icon" label="Icon" register={register} errors={errors} />
      </TabPanel>
      <TabPanel value={valueTabs} index={1}>
        <Input
          name="icon"
          label="Icon"
          register={register}
          errors={errors}
          registerOptions={{ required: true, min: 1 }}
        />
      </TabPanel>
      <div className="buttons">
        <Button className="cancel-button">Cancel</Button>
        <Button type="submit" className="save-button">
          Save
        </Button>
      </div>
    </form>
  );
};
