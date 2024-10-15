type MainProps = {
  mainPage?: boolean;
};

export const Main = ({ mainPage }: MainProps) => {
  return (
    <main>
      {mainPage && (
        <a href={`chrome-extension://${chrome.runtime.id}/options.html`} target="_blank">
          Own Page
        </a>
      )}
    </main>
  );
};
