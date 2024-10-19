import { useEffect, useState } from "react";

import { TwoFactorAuthItem } from "./two-factor-auth-item";

import { getAutherConfig } from "@/shared";

import type { Secret } from "@/shared";

import "./two-factor-auth-list.sass";

export const TwoFactorAuthList = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);

  useEffect(() => {
    getAutherConfig().then(({ secrets }) => setSecrets(secrets));
  }, []);

  return (
    <div className="list-wrapper">
      {secrets.map((secret) => (
        <TwoFactorAuthItem key={secret.addedDate} secret={secret} />
      ))}
    </div>
  );
};
