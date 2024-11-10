import classNames from "classnames";

import "./tab.sass";

import type { ReactNode } from "react";

type TabType = {
  children: ReactNode;
  value: number;
  index: number;
};

export const Tab = ({ children, value, index }: TabType) => (
  <div className={classNames("overlay", { visiable: value === index })}>{children}</div>
);
