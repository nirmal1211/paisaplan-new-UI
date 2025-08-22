import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/theme.css";
import "./i18n"; // i18n initialization
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

interface AppConfig {
  [key: string]: unknown;
}
// Check if authentication is required based on route
// Renders the landing (Home) page for unauthenticated users
const renderLanding = (config: AppConfig) => {
  if (!rootElement) return;
  const root = createRoot(rootElement);
  // Home expects onLogin and config props
  import("./pages/Home/Home").then(({ default: Home }) => {
    root.render(
      <StrictMode>
        <Home onLogin={() => KeycloakService.doLogin()} config={config} />
      </StrictMode>
    );
  });
};

const initializeApp = () => {
  if (sessionStorage.getItem(REACT_TOKEN)) {
    const envs = sessionStorage.getItem("config");
    if (envs) {
      const config = JSON.parse(envs);
      KeycloakService.initKeycloak(
        () => {
          renderRoot();
        },
        config,
        () => {
          renderLanding(config);
        }
      );
    }
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
        if (rootElement) {
          const root = createRoot(rootElement);
          root.render(<h6>Error Loading Application</h6>);
        }
      });
  }
};

// Initialize the application
initializeApp();
