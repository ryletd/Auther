import { useState } from "react";
import { Progressbar, Button, generate2faCode, usePictureExists } from "@/shared";
import classNames from "classnames";

import CopyIcon from "@/shared/assets/copy.png";
import EditIcon from "@/shared/assets/edit.png";
import DeleteIcon from "@/shared/assets/delete.png";

import "./list-item.sass";

import type { MouseEvent } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { Secret } from "@/shared";

type ListItemProps = {
  secret: Secret;
  progress: number;
  onEdit?: (secret: Secret) => void;
  onDelete?: (secret: Secret) => void;
  dragHandleProps?: DraggableAttributes | SyntheticListenerMap;
};

export const ListItem = ({ secret, progress, onEdit, onDelete, dragHandleProps }: ListItemProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyId, setCopyId] = useState<number>(0);
  const code = generate2faCode(secret.secret);
  const iconExists = usePictureExists(secret.icon);
  const warning = progress <= 5;

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    clearTimeout(copyId);
    setIsCopied(true);

    const id = setTimeout(() => setIsCopied(false), 500);

    setCopyId(+id);
  };

  const editSecret = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit?.(secret);
  };

  const deleteSecret = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete?.(secret);
  };

  return (
    <div className={classNames("list-item", { copied: isCopied })} onClick={copyCode}>
      {dragHandleProps && (
        <button className="drag-button" {...dragHandleProps}>
          <div />
        </button>
      )}
      {secret.icon && iconExists ? (
        <img className={classNames("icon", { warning })} src={secret.icon} alt="icon" />
      ) : (
        <div className={classNames("icon", { warning })}>{secret.name.at(0)?.toUpperCase()}</div>
      )}
      <div className="inner-wrapper">
        <h5 className="name">{secret.name}</h5>
        <p className={classNames("code", { warning })}>{code}</p>
      </div>
      <div className="actions">
        <button className={classNames("copy-button", { copied: isCopied })} onClick={copyCode}>
          <img src={CopyIcon} alt="icon" />
        </button>
        {!!onEdit && (
          <Button className="edit-button" onClick={editSecret}>
            <img src={EditIcon} alt="edit" />
          </Button>
        )}
        {!!onDelete && (
          <Button className="delete-button" onClick={deleteSecret}>
            <img src={DeleteIcon} alt="delete" />
          </Button>
        )}
      </div>
      <Progressbar progress={progress} />
    </div>
  );
};
