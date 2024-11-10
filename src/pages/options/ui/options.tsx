import { useState } from "react";

import { Header, EditForm, DeleteForm } from "@/entities";
import { SecretCodesList } from "@/widgets";
import { Modal } from "@/shared";

import type { Secret } from "@/shared";

export const Options = () => {
  const [activeEditSecret, setActiveEditSecret] = useState<Secret | null>(null);
  const [activeDeleteSecret, setActiveDeleteSecret] = useState<Secret | null>(null);

  return (
    <main>
      <Header />
      <div className="container">
        <SecretCodesList
          editable
          setActiveEditSecret={setActiveEditSecret}
          setActiveDeleteSecret={setActiveDeleteSecret}
        />
      </div>
      <Modal open={!!activeEditSecret} width="600px" onClose={() => setActiveEditSecret(null)}>
        <EditForm secret={activeEditSecret!} onClose={() => setActiveEditSecret(null)} />
      </Modal>
      <Modal open={!!activeDeleteSecret} width="600px" onClose={() => setActiveDeleteSecret(null)}>
        <DeleteForm secret={activeDeleteSecret!} onClose={() => setActiveDeleteSecret(null)} />
      </Modal>
    </main>
  );
};
