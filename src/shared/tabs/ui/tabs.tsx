import classNames from "classnames";

import "./tabs.sass";

type TabsType = {
  buttons: string[];
  onChange: (index: number) => void;
  value: number;
};

export const Tabs = ({ buttons, onChange, value }: TabsType) => {
  return (
    <div className="tabs">
      <div className="wrapper-buttons">
        {buttons.map((button, index) => (
          <button
            type="button"
            onClick={() => onChange(index)}
            key={button + index}
            className={classNames("tabs-button", { active: value === index })}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};
