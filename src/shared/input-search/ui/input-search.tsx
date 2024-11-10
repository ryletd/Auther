import SearchIcon from "@/shared/assets/search.png";

import "./input-search.sass";

import type { ChangeEvent } from "react";

type InputSeacrhProps = {
  label?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const InputSearch = ({ label, name, onChange, placeholder }: InputSeacrhProps) => (
  <div className="input-wrapper">
    {label && (
      <label className="label" htmlFor={name}>
        {label}
      </label>
    )}
    <img className="search-icon" src={SearchIcon} alt="search" />
    <input className="input" id={name} type="text" autoComplete="off" placeholder={placeholder} onChange={onChange} />
  </div>
);
