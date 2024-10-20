import { useEffect } from "react";
import { useAuthConfig } from "@/shared/store/auther-config";

import { TwoFactorAuthList } from "@/widgets";
import { Header } from "@/entities";
import { getAutherConfig } from "@/shared";

export const Options = () => {
  const { setAutherConfig } = useAuthConfig();

  useEffect(() => {
    getAutherConfig().then((config) => setAutherConfig(config));
  }, [setAutherConfig]);

  return (
    <main>
      <Header />
      <div className="container">
        <TwoFactorAuthList editable />
      </div>
    </main>
  );
};
