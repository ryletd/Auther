export const Main = () => {
  return (
    <main>
      <a href={`chrome-extension://${chrome.runtime.id}/options.html`} target="_blank">
        Options
      </a>
    </main>
  );
};
