import { StrictMode } from "react";
import { SnackbarProvider } from "notistack";

import { Main } from "@/pages";
import { Options } from "@/pages";

import "@/app/styles/global.sass";

type AppProps = {
  mainPage?: boolean;
};

export const App = ({ mainPage = true }: AppProps) => (
  <StrictMode>
    <SnackbarProvider> {mainPage ? <Main /> : <Options />} </SnackbarProvider>
  </StrictMode>
);
