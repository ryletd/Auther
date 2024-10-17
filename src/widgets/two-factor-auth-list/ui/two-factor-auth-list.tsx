import { TwoFactorAuthItem } from "@/widgets/two-factor-auth-item";

import { TWO_FACTOR_LIST } from "@/shared";

import "./two-factor-auth-list.sass";

export const TwoFactorAuthList = () => (
  <div className="list-wrapper">
    {TWO_FACTOR_LIST.map(({ icon, name, code }) => (
      <TwoFactorAuthItem key={code} icon={icon} name={name} code={code} />
    ))}
  </div>
);
