import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { useAutherConfigStore, getAutherConfig, setAutherConfig, Search } from "@/shared";
import { DraggableList } from "./draggable-list";
import { ListItem } from "./list-item";

import "./secret-codes-list.sass";

import type { Dispatch, SetStateAction } from "react";
import type { Secret } from "@/shared";

type SecretCodesListProps = {
  searchValue?: string;
  editable?: boolean;
  setActiveEditSecret?: Dispatch<SetStateAction<Secret | null>>;
  setActiveDeleteSecret?: Dispatch<SetStateAction<Secret | null>>;
};

type ListProps = {
  secrets: Secret[];
  editable?: boolean;
  setActiveEditSecret?: Dispatch<SetStateAction<Secret | null>>;
  setActiveDeleteSecret?: Dispatch<SetStateAction<Secret | null>>;
};

export const List = ({ secrets, editable = false, setActiveEditSecret, setActiveDeleteSecret }: ListProps) => {
  const [progress, setProgress] = useState<number>(0);

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
        <DraggableList
          id="draggable"
          secrets={secrets}
          progress={progress}
          setActiveEditSecret={setActiveEditSecret}
          setActiveDeleteSecret={setActiveDeleteSecret}
        />
      ) : (
        secrets.map((secret) => <ListItem key={secret.id} secret={secret} progress={progress} />)
      )}
    </div>
  );
};

export const SecretCodesList = ({ editable, setActiveEditSecret, setActiveDeleteSecret }: SecretCodesListProps) => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const { autherConfig } = useAutherConfigStore();

  const filteredSecrets = useMemo(
    () =>
      autherConfig?.secrets.filter((secret) => secret.name.toLowerCase().includes(deferredSearch.toLowerCase())) ?? [],
    [autherConfig?.secrets, deferredSearch]
  );

  return (
    <section>
      {editable && (
        <Search name="search" placeholder="Search key..." onChange={(event) => setSearch(event.target.value)} />
      )}
      <List
        editable={editable}
        secrets={filteredSecrets}
        setActiveEditSecret={setActiveEditSecret}
        setActiveDeleteSecret={setActiveDeleteSecret}
      />
    </section>
  );
};
