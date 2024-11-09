import { useState } from "react";
import { Progressbar, Button, generate2faCode, usePictureExists } from "@/shared";
import classNames from "classnames";

import CopyIcon from "@/shared/assets/copy.png";
import EditIcon from "@/shared/assets/edit.png";
import DeleteIcon from "@/shared/assets/delete.png";

import "./two-factor-auth-item.sass";

import type { MouseEvent } from "react";
import type { Secret } from "@/shared";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type TwoFactorAuthItemProps = {
  secret: Secret;
  progress: number;
  onCancel?: (secret: Secret) => void;
  onDelete?: (secret: Secret) => void;
  dragHandleProps?: {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
  };
};

export const TwoFactorAuthItem = ({
  secret,
  progress,
  onCancel,
  onDelete,
  dragHandleProps,
}: TwoFactorAuthItemProps) => {
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
    onCancel?.(secret);
  };

  const deleteSecret = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete?.(secret);
  };

  return (
    <div className={classNames("wrapper", { copied: isCopied })} onClick={copyCode}>
      <div className="drop" {...dragHandleProps} />
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
        {!!onCancel && (
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
