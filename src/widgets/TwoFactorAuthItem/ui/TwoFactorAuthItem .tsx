import { FC } from "react";

import { TwoFactorAuthItemProps } from "../types/2faTypes";

import "./TwoFactorAuthItem.sass";

export const TwoFactorAuthItem: FC<TwoFactorAuthItemProps> = ({ icon, name, code }) => (
  <div className="wrapper">
    <img className="icon" src={icon} alt="icon" />
    <div className="inner-wrapper">
      <h5 className="name">{name}</h5>
      <p className="code">{code}</p>
    </div>
  </div>
);
