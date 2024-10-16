import { StrictMode } from "react";

import { Main } from "@/pages/main";

import "@/app/styles/global.sass";

type AppProps = {
  mainPage?: boolean;
};

export const App = ({ mainPage = true }: AppProps) => <StrictMode>{mainPage ? <Main /> : <></>}</StrictMode>;
