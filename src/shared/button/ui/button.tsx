import { forwardRef } from "react";

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, disabled = false, className, type = "button" }, ref) => (
    <button type={type} onClick={onClick} disabled={disabled} className={classNames("button", className)} ref={ref}>
      {children}
    </button>
  )
);
