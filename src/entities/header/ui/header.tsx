import { useState } from "react";

import { Modal, Button } from "@/shared";
import { SettingsForm } from "@/entities";

import Favicon from "@/shared/assets/favicon.png";
import SettingsIcon from "@/shared/assets/settings.png";
import ImportIcon from "@/shared/assets/import.png";
import ExportIcon from "@/shared/assets/export.png";

import { getAutherConfig } from "@/shared";
import { saveAutherConfig } from "@/shared";

import "./header.sass";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="header-wrapper">
      <div className="header">
        <h2 className="title">
          <img src={Favicon} alt="Auther" />
          Auther
        </h2>
        <div className="menu">
          <Button className="header-button" onClick={() => saveAutherConfig({})}>
            <img src={ImportIcon} alt="import" />
          </Button>
          <Button className="header-button" onClick={() => {}}>
            <img src={ExportIcon} alt="export" />
          </Button>
          <Button className="header-button" onClick={() => setOpenModal((isOpened) => !isOpened)}>
            <img src={SettingsIcon} alt="settings" />
          </Button>
        </div>
      </div>
      <Modal open={openModal} width="600px" onClose={() => setOpenModal((isOpened) => !isOpened)}>
        <SettingsForm />
      </Modal>
    </header>
  );
};
