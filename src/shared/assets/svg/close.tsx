import { FC, SVGProps } from "react";

export const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} height="1em" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1L1 17M17 17L1 1L17 17Z" stroke="#ff3838" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
