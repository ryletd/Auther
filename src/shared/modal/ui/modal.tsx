import { useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import "./modal.sass";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width: string;
  className?: string;
  ignoreScroll?: boolean;
};

export const Modal = ({ open, onClose, children, width, className, ignoreScroll }: ModalProps) => {
  useEffect(() => {
    if (ignoreScroll) {
      return;
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return open
    ? createPortal(
        <div className={classNames("modal", className)} onClick={onClose}>
          <div style={{ maxWidth: width }} onClick={(event) => event.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};
