import { useState } from "react";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";

import { CloseIcon } from "@/shared";
import ArrowUp from "@/shared/assets/arrow-up.png";

import "./upload.sass";

import type { UseFormRegister, FieldErrors, RegisterOptions, FieldValues, Path } from "react-hook-form";

type UploadProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  registerOptions?: RegisterOptions<T>;
};

export const Upload = <T extends FieldValues>({ label, name, register, errors, registerOptions }: UploadProps<T>) => {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: setFiles,
    accept: { Picture: ["image/*"] },
  });

  const handleDeleteFile = (fileToDelete: File) => {
    const newFiles = files.filter((file) => {
      file.name === fileToDelete.name;
    });

    setFiles(newFiles);
  };

  return (
    <div className="upload-wrapper">
      {label && <label className="label">{label}</label>}
      <div className={classNames("upload", { error: errors[name] })} {...getRootProps()}>
        <input maxLength={1} accept="image/*" {...register(name, registerOptions)} {...getInputProps()} />
        {isDragActive ? (
          <p className="text-upload">Drop the files here ...</p>
        ) : (
          <div className="upload-loading">
            <p className="text-upload">Upload</p>
            <img src={ArrowUp} alt="close" />
          </div>
        )}
      </div>
      {files.map((file) => (
        <div key={file.name} className="file">
          <p className="file-name">{file.name}</p>
          <button onClick={() => handleDeleteFile(file)} className="close-btn">
            <CloseIcon className="btn-icon" />
          </button>
        </div>
      ))}
    </div>
  );
};
