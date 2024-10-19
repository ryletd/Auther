import { useState } from "react";

import { Progressbar } from "@/shared/progressbar";

import CopyIcon from "@/shared/assets/copy.png";

import "./two-factor-auth-item.sass";

type TwoFactorAuthItemProps = {
  icon: string | null;
  name: string;
  code: string;
};

export const TwoFactorAuthItem = ({ icon, name, code }: TwoFactorAuthItemProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <button className="wrapper" onClick={handleCopy}>
      <img className="icon" src={icon as string} alt="icon" />
      <div className="inner-wrapper">
        <h5 className="name">{name}</h5>
        <p className="code">{code}</p>
      </div>
      <div className="actions">
        {isCopied && (
          <button className="copy-btn" onClick={handleCopy}>
            <img src={CopyIcon} alt="icon" />
          </button>
        )}
        <Progressbar />
      </div>
    </button>
  );
};
