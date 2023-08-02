const makeRequest = async (url, nonce, setResult) => {
  const response = await fetch(url, { headers: { "X-WP-Nonce": nonce } });
  const result = await response.json();
  setResult({ result });
};

const initApp = (appContainer) => {
  const nonce = appContainer.dataset.nonce;
  const status = appContainer.querySelector("#status");
  appContainer.querySelectorAll("button[data-url]").forEach((button) => {
    button.addEventListener("click", async () => {
      const url = button.dataset.url;
      await makeRequest(
        url,
        nonce,
        (data) => (status.innerHTML = JSON.stringify(data))
      );
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.querySelector("#app");
  if (!appContainer) {
    return;
  }
  initApp(appContainer);
});
