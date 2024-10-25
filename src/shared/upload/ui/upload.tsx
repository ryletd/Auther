import { useDropzone } from "react-dropzone";

import { CloseIcon, readFile } from "@/shared";
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      const file = files?.[0];

      if (file) {
        readFile(file, "url").then((url) => setValue(name, url as PathValue<T, Path<T>>));
      }
    },
    accept: { "image/*": [] },
  });

  return (
    <div className={"upload-wrapper"}>
      {label && <label className="label">{label}</label>}
      <div className={"upload"} {...getRootProps()}>
        <input maxLength={1} accept="image/*" {...getInputProps()} />
        {isDragActive ? (
          <p className="text-upload">Drop the files here ...</p>
        ) : (
          <div className="upload-loading">
            <p className="text-upload">Upload</p>
            <img src={ArrowUp} alt="close" />
          </div>
        )}
      </div>
      {icon && (
        <div className="file">
          <p className="file-name">{icon}</p>
          <button onClick={() => setValue(name, null as PathValue<T, Path<T>>)} className="close-button">
            <CloseIcon className="button-icon" />
          </button>
        </div>
      )}
    </div>
  );
};
