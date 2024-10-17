import classNames from "classnames";

import "./button.sass";

import type { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  children: string | ReactNode;
  type?: "submit" | "button";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

export const Button = ({ children, onClick, disabled = false, className, type = "button" }: ButtonProps) => (
  <button type={type} onClick={onClick} disabled={disabled} className={classNames("button", className)}>
    {children}
  </button>
);
