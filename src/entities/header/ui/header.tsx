import { useState } from "react";

import { Modal, Button } from "@/shared";
import { SettingsForm } from "@/entities";

import SettingsIcon from "@/shared/assets/settings.png";

import "./header.sass";

export const Header = () => {
  const [openModal, setOpenModal] = useState(!false);

  return (
    <header className="header-wrapper">
      <div className="header">
        <h2 className="title">Auther</h2>
        <Button className="settings-button" onClick={() => setOpenModal((isOpened) => !isOpened)}>
          <img src={SettingsIcon} alt="settings" />
        </Button>
      </div>
      <Modal open={openModal} width="600px" onClose={() => setOpenModal((isOpened) => !isOpened)}>
        <SettingsForm />
      </Modal>
    </header>
  );
};
