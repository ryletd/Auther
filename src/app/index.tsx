import { StrictMode } from "react";

import { Main } from "@/pages/main";

type AppProps = {
  mainPage?: boolean;
};

export const App = ({ mainPage = true }: AppProps) => (
  <StrictMode>
    <Main mainPage={mainPage} />
  </StrictMode>
);
