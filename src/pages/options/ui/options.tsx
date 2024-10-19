import { useEffect } from "react";
import { useStore } from "@/store/auther-config";

import { TwoFactorAuthList } from "@/widgets";
import { Header } from "@/entities";
import { getAutherConfig } from "@/shared";

export const Options = () => {
  const { setError, setAutherConfig } = useStore((state) => ({
    setError: state.setError,
    setAutherConfig: state.setAutherConfig,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAutherConfig();
        setAutherConfig(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred while retrieving the configuration");
        }
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
