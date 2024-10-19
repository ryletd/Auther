import { useEffect, useState } from "react";

import { TwoFactorAuthItem } from "./two-factor-auth-item";

import { DeleteForm } from "@/entities";
import { Modal, getAutherConfig, deleteSecret } from "@/shared";

import type { Secret } from "@/shared";

import "./two-factor-auth-list.sass";

export const TwoFactorAuthList = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [activeEditSecret, setActiveEditSecret] = useState<Secret | null>(null);
  const [activeDeleteSecret, setActiveDeleteSecret] = useState<Secret | null>(null);

  useEffect(() => {
    getAutherConfig().then(({ secrets }) => setSecrets(secrets));
  }, []);

  useEffect(() => {
    const countTime = () => {
      const seconds = new Date().getSeconds();
      const time = seconds < 30 ? seconds : seconds - 30;

      setProgress(30 - time);
    };

    countTime();

    const id = setInterval(countTime, 1000);
    return () => clearInterval(id);
  }, []);

  const onEditCancel = () => {
    setActiveEditSecret(null);
  };

  const onDeleteCancel = () => {
    setActiveDeleteSecret(null);
  };

  const onDelete = () => {
    if (activeDeleteSecret) {
      deleteSecret(activeDeleteSecret.secret);
    }

    setActiveDeleteSecret(null);
  };

  return (
    <div className="list-wrapper">
      {secrets.map((secret) => (
        <TwoFactorAuthItem
          key={secret.secret}
          secret={secret}
          progress={progress}
          onCancel={setActiveEditSecret}
          onDelete={setActiveDeleteSecret}
        />
      ))}
      <Modal open={!!activeDeleteSecret} width="600px" onClose={() => setActiveDeleteSecret(null)}>
        <DeleteForm name={activeDeleteSecret?.name ?? ""} onCancel={onDeleteCancel} onDelete={onDelete} />
      </Modal>
    </div>
  );
};
