import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/theme.css";
import KeycloakService from "./keycloackService.ts";
import { REACT_TOKEN } from "./utils/Constants/SessionStorageConstants.ts";
import Home from "./pages/Home/Home.tsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

interface Config {
  authURL: string;
  clientId: string;
  gatewayURL: string;
  realm: string;
  socketFileServerURL: string;
  socketURL: string;
  sxpProjectID: string;
  sxpSocketURL: string;
  [key: string]: any;
}

const renderRoot = () => {
  if (rootElement) {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    console.error("Root element not found");
  }
};

const renderLanding = (config: Config): void => {
  root.render(
    <Home
      onLogin={() => KeycloakService.initAndLogin(config)}
      config={config}
    />
  );
};

if (sessionStorage.getItem(REACT_TOKEN)) {
  const envs = sessionStorage.getItem("config");
  const config = JSON.parse(envs);
  KeycloakService.initKeycloak(
    () => renderRoot(),
    config,
    () => {
      renderLanding(config);
    }
  );
} else {
  fetch(`${"https://apps-dev.trovity.com"}${window.location.pathname}.json`)
    .then(async (r) => r.json())
    .then((config) => {
      sessionStorage.setItem("config", JSON.stringify(config));
      KeycloakService.initKeycloak(
        () => renderRoot(),
        config,
        () => {
          renderLanding(config);
        }
      );
    })
    .catch(() => {
      const root = createRoot(rootElement);
      root.render(<h6>Error Loading Application</h6>);
    });
}
