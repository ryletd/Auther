type SvgProps = {
  className: string | undefined;
};

export const CloseIcon = ({ className }: SvgProps) => (
  <svg className={className} height="1em" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 1L1 17M17 17L1 1L17 17Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="currentColor"
    />
  </svg>
);
