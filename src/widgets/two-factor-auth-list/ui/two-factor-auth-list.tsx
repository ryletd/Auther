import { useDeferredValue, useEffect, useState } from "react";

import { TwoFactorAuthItem } from "./two-factor-auth-item";

import { EditForm, DeleteForm } from "@/entities";
import { Modal, useAutherConfigStore, getAutherConfig, setAutherConfig, Input } from "@/shared";

import type { Secret } from "@/shared";

import "./two-factor-auth-list.sass";

type TwoFactorAuthListProps = {
  editable?: boolean;
};

export const TwoFactorAuthList = ({ editable = false }: TwoFactorAuthListProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [activeEditSecret, setActiveEditSecret] = useState<Secret | null>(null);
  const [activeDeleteSecret, setActiveDeleteSecret] = useState<Secret | null>(null);
  const deferredSearch = useDeferredValue(search);
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

  const filteredSecrets =
    autherConfig?.secrets.filter((secret) => secret.name.toLowerCase().includes(deferredSearch.toLowerCase())) || [];

  return (
    <div className="list-wrapper">
      <Input
        name="search"
        type="text"
        placeholder="Search key..."
        registerOptions={{ required: false }}
        onChange={(event) => setSearch(event.target.value)}
        errors={{}}
      />
      {filteredSecrets.map((secret) => (
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
