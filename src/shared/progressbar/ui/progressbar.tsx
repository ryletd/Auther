import "./progressbar.sass";

type ProgressbarProps = {
  progress: number;
};

const LIMIT = 30;

export const Progressbar = ({ progress }: ProgressbarProps) => {
  const percent = (LIMIT - progress) * (360 / LIMIT);
  const warning = progress <= 5;

  return (
    <div
      className="progressbar-wrapper"
      style={{ background: `conic-gradient(${warning ? "#ff3838" : "#32ff7e"} ${percent}deg, #777777 ${percent}deg)` }}
    >
      <div className="progressbar">
        <div className="progressbar-text">{progress}</div>
      </div>
    </div>
  );
};
