import { TwoFactorAuthItem } from "@/widgets/TwoFactorAuthItem";

import OpenLinkIcon from "@/shared/assets/open-link.png";

import { twoFactorList } from "@/__mocks__/2faMocks";

import "./main.sass";

export const Main = () => {
  return (
    <main className="main">
      <a href={`chrome-extension://${chrome.runtime.id}/options.html`} target="_blank" className="link">
        Options
        <img src={OpenLinkIcon} alt="open-link" className="link-picture" />
      </a>

      <div className="list-wrapper">
        {twoFactorList.map(({ icon, name, code }) => (
          <TwoFactorAuthItem key={code} icon={icon} name={name} code={code} />
        ))}
      </div>
    </main>
  );
};
