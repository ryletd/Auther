import { useEffect } from "react";
import { useStore } from "@/store/auther-config";

import { TwoFactorAuthList } from "@/widgets";
import { Header } from "@/entities";
import { getAutherConfig } from "@/shared";

export const Options = () => {
  const setAutherConfig = useStore((state) => state.setAutherConfig);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAutherConfig();
        setAutherConfig(result);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchData();
  }, [setAutherConfig]);

  return (
    <main>
      <Header />
      <div className="container">
        <TwoFactorAuthList />
      </div>
    </main>
  );
};
