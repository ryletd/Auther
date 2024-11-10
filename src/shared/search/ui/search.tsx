import SearchIcon from "@/shared/assets/search.png";

import "./search.sass";

import type { ChangeEvent } from "react";

type SeacrhProps = {
  label?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const Search = ({ label, name, onChange, placeholder }: SeacrhProps) => (
  <div className="search-wrapper">
    {label && (
      <label className="label" htmlFor={name}>
        {label}
      </label>
    )}
    <img className="search-icon" src={SearchIcon} alt="search" />
    <input className="input" id={name} type="text" autoComplete="off" placeholder={placeholder} onChange={onChange} />
  </div>
);
