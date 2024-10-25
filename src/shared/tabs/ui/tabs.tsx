import classNames from "classnames";

import "./tabs.sass";

type TabsType = {
  value: number;
  buttons: string[];
  onChange: (index: number) => void;
};

export const Tabs = ({ buttons, onChange, value }: TabsType) => (
  <div className="tabs">
    <div className="wrapper-buttons">
      {buttons.map((button, index) => (
        <button
          key={button + index}
          type="button"
          onClick={() => onChange(index)}
          className={classNames("tabs-button", { active: value === index })}
        >
          {button}
        </button>
      ))}
    </div>
  </div>
);
