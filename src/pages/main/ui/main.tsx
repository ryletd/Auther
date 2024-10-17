import { TwoFactorAuthList } from "@/widgets/two-factor-auth-list";

import OpenLinkIcon from "@/shared/assets/open-link.png";

import "./main.sass";

export const Main = () => {
  return (
    <main className="main">
      <a href={`chrome-extension://${chrome.runtime.id}/options.html`} target="_blank" className="link">
        Options
        <img src={OpenLinkIcon} alt="open-link" className="link-picture" />
      </a>
      <TwoFactorAuthList />
    </main>
  );
};
