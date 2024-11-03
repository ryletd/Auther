import { TwoFactorAuthList } from "@/widgets";
import { Header } from "@/entities";
import { Input } from "@/shared";

export const Options = () => (
  <main>
    <Header />
    <div className="container">
      <TwoFactorAuthList editable />
    </div>
  </main>
);
