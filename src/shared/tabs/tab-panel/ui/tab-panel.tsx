import classNames from "classnames";

import "./tab-panel.sass";

import type { ReactNode } from "react";

type TabPanelType = {
  children: ReactNode;
  value: number;
  index: number;
};

export const TabPanel = ({ children, value, index }: TabPanelType) => (
  <div className={classNames("overlay", { visiable: value === index })}>{children}</div>
);
