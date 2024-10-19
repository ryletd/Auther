import { useState } from "react";

import { Progressbar, generate2faCode } from "@/shared";
import classNames from "classnames";

import CopyIcon from "@/shared/assets/copy.png";

import "./two-factor-auth-item.sass";

import type { Secret } from "@/shared";

type TwoFactorAuthItemProps = {
  secret: Secret;
  progress: number;
};

export const TwoFactorAuthItem = ({ secret: { name, secret, icon }, progress }: TwoFactorAuthItemProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyId, setCopyId] = useState<number>(0);
  const code = generate2faCode(secret);
  const warning = progress <= 5;

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    clearTimeout(copyId);
    setIsCopied(true);

    const id = setTimeout(() => setIsCopied(false), 500);

    setCopyId(+id);
  };

  return (
    <div className={classNames("wrapper", { copied: isCopied })} onClick={copyCode}>
      {icon ? (
        <img className={classNames("icon", { warning })} src={icon} alt="icon" />
      ) : (
        <div className={classNames("icon", { warning })}>{name.at(0)?.toUpperCase()}</div>
      )}
      <div className="inner-wrapper">
        <h5 className="name">{name}</h5>
        <p className={classNames("code", { warning })}>{code}</p>
      </div>
      <div className="actions">
        <button className={classNames("copy-button", { copied: isCopied })} onClick={copyCode}>
          <img src={CopyIcon} alt="icon" />
        </button>
        <Progressbar progress={progress} />
      </div>
    </div>
  );
};
