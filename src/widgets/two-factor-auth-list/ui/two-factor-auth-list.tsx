import { useDeferredValue, useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { TwoFactorAuthItem } from "./two-factor-auth-item";

import { EditForm, DeleteForm } from "@/entities";
import { Modal, useAutherConfigStore, getAutherConfig, setAutherConfig, Input, Draggable, Droppable } from "@/shared";

import type { Secret } from "@/shared";

import "./two-factor-auth-list.sass";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

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

  const filteredSecrets =
    autherConfig?.secrets.filter((secret) => secret.name.toLowerCase().includes(deferredSearch.toLowerCase())) ?? [];

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
      {editable ? (
        <>
          <Input
            name="search"
            type="text"
            placeholder="Search key..."
            registerOptions={{ required: false }}
            onChange={(event) => setSearch(event.target.value)}
            errors={{}}
          />
          <DndContext>
            <SortableContext
              items={filteredSecrets.map((secret) => secret.secret)}
              strategy={verticalListSortingStrategy}
            >
              <Droppable className="drop-wrapper" id="droppable-area">
                {filteredSecrets.map((secret) => (
                  <Draggable id={secret.secret}>
                    <TwoFactorAuthItem
                      key={secret.secret}
                      secret={secret}
                      progress={progress}
                      isDragnDrop={true}
                      onCancel={editable ? () => setActiveEditSecret(secret) : undefined}
                      onDelete={editable ? () => setActiveDeleteSecret(secret) : undefined}
                    />
                  </Draggable>
                ))}
              </Droppable>
            </SortableContext>
          </DndContext>
        </>
      ) : (
        filteredSecrets.map((secret) => (
          <TwoFactorAuthItem
            key={secret.secret}
            secret={secret}
            progress={progress}
            onCancel={editable ? () => setActiveEditSecret(secret) : undefined}
            onDelete={editable ? () => setActiveDeleteSecret(secret) : undefined}
          />
        ))
      )}

      <Modal open={!!activeEditSecret} width="600px" onClose={() => setActiveEditSecret(null)}>
        <EditForm secret={activeEditSecret!} onClose={() => setActiveEditSecret(null)} />
      </Modal>
      <Modal open={!!activeDeleteSecret} width="600px" onClose={() => setActiveDeleteSecret(null)}>
        <DeleteForm secret={activeDeleteSecret!} onClose={() => setActiveDeleteSecret(null)} />
      </Modal>
    </div>
  );
};
