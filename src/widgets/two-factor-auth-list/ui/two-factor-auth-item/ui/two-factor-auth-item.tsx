import { enqueueSnackbar } from "notistack";

import { Progressbar } from "@/shared/progressbar";

import "./two-factor-auth-item.sass";

type TwoFactorAuthItemProps = {
  icon: string;
  name: string;
  code: string;
};

export const TwoFactorAuthItem = ({ icon, name, code }: TwoFactorAuthItemProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      enqueueSnackbar("Код скопирован");
    } catch (error) {
      enqueueSnackbar("Не удалось скопировать код");
    }
  };

  return (
    <button className="wrapper" onClick={handleCopy}>
      <img className="icon" src={icon} alt="icon" />
      <div className="inner-wrapper">
        <h5 className="name">{name}</h5>
        <p className="code">{code}</p>
      </div>
      <Progressbar />
    </button>
  );
};
