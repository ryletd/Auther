import { useState } from "react";
import classNames from "classnames";

import { Progressbar, generate2faCode } from "@/shared";

import CopyIcon from "@/shared/assets/copy.png";

import "./two-factor-auth-item.sass";

import type { Secret } from "@/shared";

type TwoFactorAuthItemProps = {
  secret: Secret;
};

export const TwoFactorAuthItem = ({ secret: { name, secret, icon } }: TwoFactorAuthItemProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const code = generate2faCode(secret);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return (
    <div className={classNames("wrapper", { copied: isCopied })} onClick={copyCode}>
      {icon ? <img className="icon" src={icon} alt="icon" /> : <div className="icon">{name.at(0)?.toUpperCase()}</div>}
      <div className="inner-wrapper">
        <h5 className="name">{name}</h5>
        <p className="code">{code}</p>
      </div>
      <div className="actions">
        <button className={classNames("copy-button", { copied: isCopied })} onClick={copyCode}>
          <img src={CopyIcon} alt="icon" />
        </button>
        <Progressbar />
      </div>
    </div>
  );
};
