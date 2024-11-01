import classnames from "classnames";

import "./progressbar.sass";

type ProgressbarProps = {
  progress: number;
};

const LIMIT = 30;
const CIRCLE_SQUARE = 94.24;

export const Progressbar = ({ progress }: ProgressbarProps) => (
  <div className="progressbar-wrapper">
    <svg className="progressbar" viewBox="-1.25 -1.25 32.5 32.5" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle strokeDashoffset="0" />
      <circle
        className={classnames({ warning: progress <= 5, "no-transition": progress === LIMIT })}
        strokeDashoffset={(CIRCLE_SQUARE / LIMIT) * progress}
      />
    </svg>
    <div className="progressbar-text">{progress}</div>
  </div>
);
