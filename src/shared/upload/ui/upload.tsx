import { useDropzone } from "react-dropzone";

import { readFile, usePictureExists } from "@/shared";
import ArrowUp from "@/shared/assets/arrow-up.png";

import "./upload.sass";

import type { FieldValues, Path, UseFormSetValue, PathValue, UseFormWatch } from "react-hook-form";

type UploadProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
};

export const Upload = <T extends FieldValues>({ label, name, setValue, watch }: UploadProps<T>) => {
  const icon = watch(name);
  const iconExists = usePictureExists(icon);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      const file = files?.[0];

      if (file) {
        readFile(file, "url").then((url) => setValue(name, url as PathValue<T, Path<T>>));
      }
    },
    accept: { "image/*": [] },
  });

  const handleRemoveIcon = (event: React.MouseEvent) => {
    event.stopPropagation();
    setValue(name, null as PathValue<T, Path<T>>);
  };

  return (
    <div className="upload-wrapper">
      {label && <label className="label">{label}</label>}
      <div className="upload" {...getRootProps()}>
        <input maxLength={1} accept="image/*" {...getInputProps()} />
        {isDragActive ? (
          <p className="text-upload">Drop the files here ...</p>
        ) : iconExists && icon ? (
          <div className="icon-block">
            <img className="icon" src={icon} alt="close" />
            <button onClick={handleRemoveIcon} className="button-close" type="button" />
          </div>
        ) : (
          <div className="upload-loading">
            <p className="text-upload">Upload</p>
            <img src={ArrowUp} alt="close" />
          </div>
        )}
      </div>
    </div>
  );
};
