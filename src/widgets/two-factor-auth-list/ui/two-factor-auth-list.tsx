import { useEffect, useState } from "react";

import { TwoFactorAuthItem } from "./two-factor-auth-item";

import { getAutherConfig } from "@/shared";

import type { Secret } from "@/shared";

import "./two-factor-auth-list.sass";

export const TwoFactorAuthList = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    getAutherConfig().then(({ secrets }) => setSecrets(secrets));
  }, []);

  useEffect(() => {
    const countTime = () => {
      const seconds = new Date().getSeconds();
      const time = seconds < 30 ? seconds : seconds - 30;

      setProgress(30 - time);
    };

    countTime();

    const id = setInterval(countTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="list-wrapper">
      {secrets.map((secret) => (
        <TwoFactorAuthItem key={secret.secret} secret={secret} progress={progress} />
      ))}
    </div>
  );
};
