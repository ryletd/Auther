import { TwoFactorAuthList } from "@/widgets";
import { Header } from "@/entities";

export const Options = () => {
  return (
    <main>
      <Header />
      <div className="container">
        <TwoFactorAuthList editable />
      </div>
    </main>
  );
};
