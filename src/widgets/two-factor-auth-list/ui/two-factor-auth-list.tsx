import { useEffect, useState } from "react";

import { TwoFactorAuthItem } from "./two-factor-auth-item";

import { EditForm, DeleteForm } from "@/entities";
import { Modal, useAutherConfigStore, getAutherConfig, setAutherConfig } from "@/shared";

import type { Secret } from "@/shared";

import "./two-factor-auth-list.sass";

type TwoFactorAuthListProps = {
  editable?: boolean;
};

export const TwoFactorAuthList = ({ editable = false }: TwoFactorAuthListProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [activeEditSecret, setActiveEditSecret] = useState<Secret | null>(null);
  const [activeDeleteSecret, setActiveDeleteSecret] = useState<Secret | null>(null);
  const { autherConfig } = useAutherConfigStore();

  useEffect(() => {
    getAutherConfig().then(setAutherConfig);
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

  return (
    <div className="list-wrapper">
      {autherConfig?.secrets.map((secret) => (
        <TwoFactorAuthItem
          key={secret.secret}
          secret={secret}
          progress={progress}
          onCancel={editable ? setActiveEditSecret : undefined}
          onDelete={editable ? setActiveDeleteSecret : undefined}
        />
      ))}
      <Modal open={!!activeEditSecret} width="600px" onClose={() => setActiveEditSecret(null)}>
        <EditForm secret={activeEditSecret!} onClose={() => setActiveEditSecret(null)} />
      </Modal>
      <Modal open={!!activeDeleteSecret} width="600px" onClose={() => setActiveDeleteSecret(null)}>
        <DeleteForm secret={activeDeleteSecret!} onClose={() => setActiveDeleteSecret(null)} />
      </Modal>
    </div>
  );
};
