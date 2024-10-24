import { useState, useMemo } from "react";

import { Modal, Button, useAutherConfigStore } from "@/shared";
import { AddForm, SettingsForm } from "@/entities";

import Favicon from "@/shared/assets/favicon.png";
import PlusIcon from "@/shared/assets/plus.png";
import SettingsIcon from "@/shared/assets/settings.png";

import "./header.sass";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const { autherConfig } = useAutherConfigStore();

  const newSecretCodes = useMemo(
    () => +autherConfig?.secrets.filter(({ secret }) => !autherConfig.exportedSecrets.includes(secret)).length,
    [autherConfig]
  );

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
          <Button className="header-button" onClick={() => setOpenSettingsModal((isOpened) => !isOpened)}>
            <img src={SettingsIcon} alt="settings" />
            {!!newSecretCodes && (
              <div className="header-button-badge">{newSecretCodes > 99 ? "99+" : newSecretCodes}</div>
            )}
          </Button>
        </div>
      </div>
      <Modal open={openModal} width="600px" onClose={() => setOpenModal((isOpened) => !isOpened)}>
        <AddForm onClose={() => setOpenModal((isOpened) => !isOpened)} />
      </Modal>
      <Modal open={openSettingsModal} width="600px" onClose={() => setOpenSettingsModal((isOpened) => !isOpened)}>
        <SettingsForm onClose={() => setOpenSettingsModal((isOpened) => !isOpened)} />
      </Modal>
    </header>
  );
};
