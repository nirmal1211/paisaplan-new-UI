import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/theme.css";
import KeycloakService from "./keycloackService.ts";
import { REACT_TOKEN } from "./utils/Constants/SessionStorageConstants.ts";

const rootElement = document.getElementById("root");

const renderRoot = () => {
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    console.error("Root element not found");
  }
};

if (sessionStorage.getItem(REACT_TOKEN)) {
  const envs = sessionStorage.getItem("config");
  const config = JSON.parse(envs);
  KeycloakService.initKeycloak(() => renderRoot(), config);
} else {
  fetch(`${"https://apps-dev.trovity.com"}${window.location.pathname}.json`)
    .then(async (r) => r.json())
    .then((config) => {
      sessionStorage.setItem("config", JSON.stringify(config));
      KeycloakService.initKeycloak(() => renderRoot(), config);
      renderRoot();
    })
    .catch(() => {
      const root = createRoot(rootElement);
      root.render(<h6>Error Loading Application</h6>);
    });
}
