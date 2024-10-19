import { TwoFactorAuthItem } from "./two-factor-auth-item";

import { TWO_FACTOR_LIST } from "@/shared";

import "./two-factor-auth-list.sass";

export const TwoFactorAuthList = () => (
  <div className="list-wrapper">
    {TWO_FACTOR_LIST.map(({ icon, name, secret }) => (
      <TwoFactorAuthItem key={secret} icon={icon} name={name} code={secret} />
    ))}
  </div>
);
