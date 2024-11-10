import { useRef } from "react";

import { Button, exportAutherConfig, importAutherConfig, readFile } from "@/shared";

import ImportIcon from "@/shared/assets/import.png";
import ExportIcon from "@/shared/assets/export.png";
import OpenLinkIcon from "@/shared/assets/open-link.png";

import "./settings-form.sass";

import type { ChangeEvent } from "react";

type SettingsFormType = {
  onClose: () => void;
};

export const SettingsForm = ({ onClose }: SettingsFormType) => {
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const onImportFileUpload = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    readFile(file).then((data) => {
      importAutherConfig(JSON.parse(data));
      onClose();
    });
  };

  return (
    <div className="settings-form">
      <h2 className="title">Extension settings</h2>
      <div className="settings-buttons">
        <Button className="settings-button" onClick={() => exportAutherConfig().then(onClose)}>
          <p className="settings-button-text">Export</p>
          <img className="settings-button-picture" src={ExportIcon} alt="export" />
        </Button>
        <Button className="settings-button" onClick={() => importInputRef.current?.click()}>
          <p className="settings-button-text">Import</p>
          <img className="settings-button-picture" src={ImportIcon} alt="import" />
          <input ref={importInputRef} type="file" accept="application/JSON" hidden onChange={onImportFileUpload} />
        </Button>
      </div>
      <Button onClick={onClose} className="cancel-button">
        Cancel
      </Button>
      <a className="github-link" href="https://github.com/ryletd/Auther" target="_blank">
        <img src={OpenLinkIcon} alt="open-link" />
        Github 💖
      </a>
    </div>
  );
};
