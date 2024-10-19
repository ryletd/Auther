import { useState, useEffect } from "react";

import "./progressbar.sass";

export const Progressbar = () => {
  const [progress, setProgress] = useState(0);
  const maxProgress = 30;

  useEffect(() => {
    let startTimestamp: number | null = null;

    const animateProgress = (timestamp: number) => {
      startTimestamp ??= timestamp;
      const progress = Math.min(((timestamp - startTimestamp) / 30000) * maxProgress, maxProgress);

      setProgress(progress);
      progress < maxProgress && requestAnimationFrame(animateProgress);
    };

    const animationFrame = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [maxProgress]);

  return (
    <div
      className="circular"
      style={{
        background: `conic-gradient(#32ff7e ${progress * (360 / maxProgress)}deg, lightgray ${progress * (360 / maxProgress)}deg)`,
      }}
    >
      <div className="circular-progress">
        <div className="progress-text">{Math.round(progress)}</div>
      </div>
    </div>
  );
};
