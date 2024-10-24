import { ChangeEvent, useRef } from "react";

import { Button, exportAutherConfig, importAutherConfig, readFile } from "@/shared";

import ImportIcon from "@/shared/assets/import.png";
import ExportIcon from "@/shared/assets/export.png";

import "./exchange-form.sass";

type ExchangeFormType = {
  onCloseModal: () => void;
};

export const ExchangeForm = ({ onCloseModal }: ExchangeFormType) => {
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const onImportFileUpload = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    readFile(file).then((data) => importAutherConfig(JSON.parse(data)));
  };

  return (
    <div className="form-wrapper">
      <div className="form-btn">
        <Button className="btn" onClick={() => importInputRef.current?.click()}>
          <img src={ImportIcon} alt="import" />
          <input ref={importInputRef} type="file" accept="application/JSON" hidden onChange={onImportFileUpload} />
        </Button>
        <Button className="btn" onClick={exportAutherConfig}>
          <img src={ExportIcon} alt="export" />
        </Button>
      </div>
      <Button onClick={onCloseModal} className="btn-cancel">
        Cancel
      </Button>
      <a className="link" href="https://github.com/ryletd/Auther">
        Github
      </a>
    </div>
  );
};
