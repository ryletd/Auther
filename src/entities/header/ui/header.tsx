import { useRef, useState } from "react";

import { Modal, Button, exportAutherConfig, readFile, importAutherConfig } from "@/shared";
import { SettingsForm } from "@/entities";

import Favicon from "@/shared/assets/favicon.png";
import PlusIcon from "@/shared/assets/plus.png";
import SettingsIcon from "@/shared/assets/settings.png";
import ImportIcon from "@/shared/assets/import.png";
import ExportIcon from "@/shared/assets/export.png";

import "./header.sass";

import type { ChangeEvent } from "react";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const newSecretCodes = 12;

  const onImportFileUpload = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    if (!file) {
      return;
    }

    readFile(file).then((data) => importAutherConfig(JSON.parse(data)));
  };

  return (
    <header className="header-wrapper">
      <div className="header">
        <h2 className="title">
          <img src={Favicon} alt="Auther" />
          Auther
        </h2>
        <div className="menu">
          <Button className="header-button" onClick={() => setOpenModal((isOpened) => !isOpened)}>
            <img src={PlusIcon} alt="plus" />
          </Button>
          <Button className="header-button" onClick={() => setOpenModal((isOpened) => !isOpened)}>
            <img src={SettingsIcon} alt="settings" />
            {newSecretCodes && (
              <div className="header-button-badge">{newSecretCodes > 99 ? "99+" : newSecretCodes}</div>
            )}
          </Button>
          <Button className="header-button" onClick={() => importInputRef.current?.click()}>
            <img src={ImportIcon} alt="import" />
            <input ref={importInputRef} type="file" accept="application/JSON" hidden onChange={onImportFileUpload} />
          </Button>
          <Button className="header-button" onClick={exportAutherConfig}>
            <img src={ExportIcon} alt="export" />
          </Button>
        </div>
      </div>
      <Modal open={openModal} width="600px" onClose={() => setOpenModal((isOpened) => !isOpened)}>
        <SettingsForm onSave={() => setOpenModal((isOpened) => !isOpened)} />
      </Modal>
    </header>
  );
};
