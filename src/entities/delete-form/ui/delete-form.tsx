import { useRef, useEffect } from "react";

import { Button, deleteSecretCode } from "@/shared";

import "./delete-form.sass";

import type { Secret } from "@/shared";

type DeleteFormProps = {
  secret: Secret;
  onClose: () => void;
};

export const DeleteForm = ({ secret, onClose }: DeleteFormProps) => {
  const deleteRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    deleteRef.current?.focus();
  }, []);

  const onDelete = async () => {
    await deleteSecretCode(secret.secret);

    onClose();
  };

  return (
    <form className="delete-form">
      <h2 className="title">
        Delete <span>{secret.name}</span> secret code
      </h2>
      <div className="buttons">
        <Button className="button" onClick={onClose}>
          Cancel
        </Button>
        <Button className="button" onClick={onDelete} ref={deleteRef}>
          Delete
        </Button>
      </div>
    </form>
  );
};
